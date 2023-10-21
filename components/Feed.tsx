"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import PromptCard from "./PromptCard"
import { debounce } from "@/utils/debounce"
import { PromptCardList } from "./PromptCardList"

export type PostProps = {
  creator: {
    username: string;
    email: string;
    image: string;
    _id: string;
  }
  prompt: string;
  tag: string;
  _id?: string;
}

type FeedProps = {
  
}

const Feed = (props: FeedProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<PostProps[]>([]);
  const [searchResults, setSearchResults] = useState<PostProps[]>([]);


  const debounceChange = debounce((value: string) => {
    setSearchText(value);
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceChange(e.target.value);
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)
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
    let _Posts = (allPosts as PostProps[])?.filter((post) => (post.prompt.toLowerCase().includes(_searchText) ||
      post.creator.username.toLowerCase().includes(_searchText) || post.creator.email.toLowerCase().includes(_searchText)) ||
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

      <PromptCardList
        data={searchText ? searchResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
