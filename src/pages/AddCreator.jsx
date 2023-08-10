import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uniqueId } from 'lodash.uniqueid';
import { supabase } from '../client';

function AddCreator() {
    const [creatorData, setCreatorData] = useState({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });
    const [creatorId] = useState(uniqueId)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const initialValue = localStorage.getItem("count");
        if (initialValue) setCount(initialValue);
      }, []);

    const cancel = () => {
        setCreatorData({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });
        navigate('/creators');
    };

    const validateInputs = (e) => {
        console.log("validating inputs");
        if (e.target.value === "")
          setErrors({ ...errors, [e.target.name]: true });
        else setErrors({ ...errors, [e.target.name]: false });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (creatorData.Name === "" || creatorData.Description === "") {
            alert("Creator's name and a description are required.");
            throw new Error('Creator\'s name and a description not provided');
        }

        if (creatorData.ig_handle === "" && creatorData.yt_handle === "" && creatorData.twitter_handle === "") {
            alert("At least one social media handle is required for each creator.");
            throw new Error('At least one social media handle not provided');
        }

        console.log("Unique Id: " + creatorId);
        const { error } =  await supabase
        .from('creators')
        .insert({ id: creatorId, name: creatorData.Name, description: creatorData.Description, imageURL: creatorData.Image, yt_handle:creatorData.yt_handle, ig_handle: creatorData.ig_handle, twitter_handle: creatorData.twitter_handle })
        .then(navigate("/creators/"))


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={creatorData.Name} onChange={(e) => setCreatorData({ ...creatorData, Name:e.target.value})} 
                        placeholder='Enter name of creator' style={errors.title ? { border: "2px solid red" } : null} onBlur={validateInputs} />
                    </label>
                </div>
                <div>
                    <label>
                        Image link:
                        <input type="text" value={creatorData.Image} onChange={(e) => setCreatorData({ ...creatorData, Image:e.target.value})} placeholder='Enter link here' />
                    </label>
                </div>

                <div>
                    <label>
                        Description:
                        <input type="text" value={creatorData.Description} onChange={(e) => setCreatorData({ ...creatorData, Description:e.target.value})} placeholder='Enter description here' 
                        style={errors.title ? { border: "2px solid red" } : null} onBlur={validateInputs}/>
                    </label>
                </div>
                
                <div>
                    <label>
                        Youtube handle:
                        <input type="text" value={creatorData.yt_handle} onChange={(e) => setCreatorData({ ...creatorData, yt_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                    <label>
                        Instagram handle:
                        <input type="text" value={creatorData.ig_handle} onChange={(e) => setCreatorData({ ...creatorData, ig_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                    <label>
                        Twitter handle:
                        <input type="text" value={creatorData.twitter_handle} onChange={(e) => setCreatorData({ ...creatorData, twitter_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                        <div>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                        <div>
                            <button type="button" onClick={cancel}>Cancel</button>
                        </div>
                </div>

            </form>
        </div>
    )
}


export default AddCreator;