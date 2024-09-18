import React, { useEffect, useRef, useState } from 'react'
import './searchForm.css'
import Input from '../Input/input'
import { FormState } from '../../interfaces/interfaces'
import { fetchRoutePlanner, fetchStop} from '../../utilities/fetch'

interface SearchFormProps {
  setInputValue: React.Dispatch<React.SetStateAction<FormState>>,
  inputValue: any,
  setSearchResults: React.Dispatch<React.SetStateAction<FormState>>,
  setActiveSection: React.Dispatch<React.SetStateAction<'searchResults' | 'nearby' | 'map' | null>>,
}

const SearchForm: React.FC<SearchFormProps> = ({setInputValue, inputValue, setSearchResults, setActiveSection}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<string>('');
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.target;
    setInputValue(prevData => ({
      ...prevData,
      [id]: value
    }));   
    setActiveInput(id);

    if (value.length > 2) { 
      const results = await fetchStop(value);
      setSuggestions(results.map((result: any) => result.StopLocation.name));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(prevData => ({
      ...prevData,
      [activeInput]: suggestion
    }));
    setSuggestions([]);
  };


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(inputValue.searchFrom || inputValue.searchTo){
      const searchFrom = await fetchStop(inputValue.searchFrom);
      const searchTo = await fetchStop(inputValue.searchTo);
      const originId = searchFrom[0].StopLocation.extId;
      const destId = searchTo[0].StopLocation.extId;
  
      const routePlanner = await fetchRoutePlanner(originId, destId);
        
      setSearchResults(routePlanner.Trip);
      setActiveSection('searchResults')
    }    
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Från</legend>
        {/* <Label htmlFor={'searchFrom'}>Från: </Label> */}
        <Input type={'text'} id={'searchFrom'} name={'searchFrom'} placeholder={'Sök från'} value={inputValue.searchFrom} autoComplete="off" onChange={handleInputChange} />
        {activeInput === 'searchFrom' && suggestions.length > 0 && (
          <ul className="suggestions-dropdown" ref={dropdownRef}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </fieldset>
      <fieldset>
      <legend>Till</legend>
        {/* <Label htmlFor={'seachTo'}>Till: </Label> */}
        <Input type={'text'} id={'searchTo'} name={'searchTo'} placeholder={'Sök till'} value={inputValue.searchTo} autoComplete="off" onChange={handleInputChange} />
        {activeInput === 'searchTo' && suggestions.length > 0 && (
          <ul className="suggestions-dropdown" ref={dropdownRef}>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </fieldset>
      <button type='submit'>Sök</button>
    </form>
  )
}

export default SearchForm