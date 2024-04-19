"use client";
import React, { useContext, useState } from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "@/helpers/icons";
import { UserContext } from "@/context/UserContext";
const SearchInput = ({ handleSearch }) => {
  let { setSearchData, setCoinSearch, setSearchText, searchText, searchData } =
    useContext(UserContext);

  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };
  return (
    <>
      <form
        className="xl:w-96 lg:w-60 w-full relative flex items-center  lg:ml-7  font-nunito"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="Search"
          onChange={handleInput}
          value={searchText}
          className="w-full text-white rounded bg-gray-200 placeholder:text-gray-100 pl-2 placeholder:text-base required outline-0 
            border border-transparent focus:border-cyan"
          placeholder="Search here..."
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <SearchIcon />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul
          className="absolute top-11 left-0 w-96 h-96 rounded
overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 
backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200
"
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex text-white items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : searchData.length === 0 ? (
            <li
              className="flex text-white items-center ml-4 my-2 cursor-pointer"
            >
              <span>No Coin Available</span>
            </li>
          ) : (
            <div
              className="w-full h-full flex justify-center items-center
             "
            >
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full
             border-b-gray-200 animate-spin
             "
                role="status"
              />
              <span className="text-white ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  let { setSearchData } = useContext(UserContext);
  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);
      setSearchData(data.coins);
    } catch (error) {
      //console.log(error);
    }
  };
  const debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);

  return (
    <div className=" relative">
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
};

export default Search;
