"use client"
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { debounce } from "@utils/debounce"

const PromptCardList = ({ data, handleTagClick }) => <div className="mt-16 prompt_layout">
  {
    data.map((post) => (
      <PromptCard
        key={ post._id }
        post={ post }
        handleTagClick={ handleTagClick }
      />
    ))
  }
</div>

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const debounceChange = debounce((value) => {
    setSearchText(value);
  })

  const handleSearchChange = (e) => {
    debounceChange(e.target.value);
  }



  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  useEffect(() => {
    let _searchText = searchText.toLowerCase();
    let _Posts = allPosts?.filter((post) => (post.prompt.toLowerCase().includes(_searchText) |
      post.creator.username.toLowerCase().includes(_searchText) | post.creator.email.toLowerCase().includes(_searchText)) |
      post.tag.toLowerCase().includes(_searchText));
    setSearchResults([..._Posts]);
  }, [searchText])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={ searchText }
          onChange={ handleSearchChange }
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <PromptCardList
            data={ searchResults }
            handleTagClick={ () => { } }
          />
        ) : (
          <PromptCardList
            data={ allPosts }
            handleTagClick={ () => { } }
          />
        )
      }
    </section>
  )
}

export default Feed
