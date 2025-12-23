import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axiosPublic from '../../Context/API/axiosPublic';
import { toast, ToastContainer } from 'react-toastify';

const AddArt = () => {

    const {user} = useContext(AuthContext);
    const [artistid, setArtistId] = useState("");

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await axiosPublic.get('/user', {
                    params: { email: user.email },
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                });
                setArtistId(res.data.userId || res.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (user?.email) {
            fetchUserId();
        }
    }, [user]);

    const AddArtToDb = (e) => {

        e.preventDefault();
        const ArtWork = {
            title: e.target.title.value,
            imageURL: e.target.image.value,
            category: e.target.category.value,
            medium: e.target.medium.value,
            description: e.target.description.value,
            dimensions: e.target.dimension.value,
            price: e.target.price.value,
            visibility: e.target.visibility.value,
            artistId: artistid,
            likesCount: 0,
            createdAt: new Date(),
            updatedAt: "",
        }
        
        const sendDb = async () => {
            try {
                const res = await axiosPublic.post("/add-art", ArtWork, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                });
                // toast.success(`${ArtWork.title} Inserted.`);
                // e.target.reset();
                const dataId = res.data.insertedId;
                // const dataId = res.data.insertedId;
                if (!dataId) throw new Error("No insertedId returned");
                await axiosPublic.patch(`/add-art/${dataId}`, {
                  ArtistId: artistid 
                }, {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                });
                toast.success(`${ArtWork.title} Inserted.`);
                e.target.reset();
                // try {
                //     const update = await axiosPublic.patch(`/add-art/${dataId}`, {
                //         ArtistId: artistid
                //     });
                //     // console.log(update.data);
                    
                // } catch (error) {
                //     // error handle
                //     console.log(error);
                // }
            } catch (error) {
                toast.error('Something went wrong');
            }
        }
        sendDb();
        // console.log(ArtWork);
        // console.log(Title, Image, Medium, Description, Dimensions, Price, Visibility, Category);

    }

    return (
        <div className='max-w-6xl w-full mx-auto  px-10 lg:px-40 transition-all py-16 flex flex-col justify-center items-center gap-3 lg:gap-5'>
            <div>
                <h2 className='text-2xl font-bold transition-colors'>ADD ARTWORK</h2>
            </div>
            <form onSubmit={AddArtToDb} className='bg-accent w-full py-10 rounded-2xl px-20 flex flex-col gap-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <section>
                    <legend className="fieldset-legend text-base-100">Title</legend>
                    <input required={true} type="text" name='title' className="input" placeholder="Title of your Artwork" />
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Image URL</legend>
                    <input required={true} type="url" name='image' className="input" placeholder="Image URL of your Artwork" />
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Medium</legend>
                    <input required={true} type="text" name='medium' className="input" placeholder="Medium URL of your Artwork" />
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Description</legend>
                    <textarea required={true} type="text" className="textarea w-full lg:min-h-[50px] input h-30 lg:h-10 placeholder:text-left placeholder:flex placeholder:flex-row placeholder:justify-center placeholder:items-center placeholder:pt-2" placeholder="Description URL of your Artwork"  name='description'/>
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Dimensions (Optional)</legend>
                    <input  type="text" name='dimension' className="input" placeholder="Dimensions of your Artwork" />
                </section>
                <section> 
                    <legend className="fieldset-legend text-base-100">Price (Optional)</legend>
                    <input type="text" name='price' className="input" placeholder="Price of your Artwork" />
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Visibility</legend>
                    <select required={true} name="visibility" className="select">
                        <option className="input">Public</option>
                        <option className="input">Private</option>
                    </select>
                    {/* <input type="text" className="input" placeholder="Medium of your Artwork" /> */}
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Category</legend>
                    <select required={true} name="category" className="select">
                        <option className="input">Landscape</option>
                        <option className="input">Painting</option>
                        <option className="input">Portrait</option>
                        <option className="input">Abstract</option>
                        <option className="input">Urban</option>
                        <option className="input">Digital Art</option>
                    </select>
                </section>
                <section>
                    <legend className="fieldset-legend text-base-100">Artist</legend>
                    <input type="text" name='dimension' className="input" placeholder={user.displayName} readOnly={true} />
                </section>
                <section> 
                    <legend className="fieldset-legend text-base-100">Artist Email</legend>
                    <input type="number" name='price' className="input" placeholder={user.email} readOnly={true}  />
                </section>

                {/* <section>

                    {/* <button type="number" className="input" placeholder="Submit" /> */}
                {/* </section> */}
                </div>
                <section className='rounded-xl flex justify-center items-center'>
                    {/* <button className='input' placeholder="Add"></button> */}
                    <input type="submit" value="Add Artwork" className={`input ${artistid === "" ? "disabled" : ""}`} />
                </section>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddArt;