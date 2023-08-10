import React, { useState, useEffect } from "react";
import Creator from "../components/Creator";
import axios from 'axios'
import { supabase } from "../client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

function ShowCreators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        fetchCreators();
    }, []);
    
    const fetchCreators = async () => {
        try {
          const response = await supabase.from('creators').select() // Replace this URL with your backend API endpoint
          setCreators(response.data);
          console.log("Rows: " + creators.length)
        } catch (error) {
          console.error(error);
        }
      };



      if (creators.length === 0) {
        return (
            <h1>No creators have been added</h1>
        )
      }

      else {
    const creatorsMapped = creators.map(creator => {
        return (
            <div>
                <Creator
                    key={creator.id}
                    id = {creator.id}
                    imageURL = {creator.imageURL}
                    name = {creator.name}
                    description = {creator.description}
                    yt_handle = {creator.yt_handle}
                    ig_handle = {creator.ig_handle}
                    twitter_handle = {creator.twitter_handle}
                />
            </div>
        )
        })

        return (
            <>
                <Link to={'/'}>
                    <button>Home</button>
                </Link>
                {creatorsMapped}
                <Link to={'/add'}>
                    <button>Add a Creator</button>
                </Link>
            </>
        )
    
    }



}


export default ShowCreators;