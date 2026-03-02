import { Sparkles } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import axiosPublic from '../../Context/API/axiosPublic';
import EditCard from '../../Templates/ArtCard/EditCard/EditCard';

const Gallery = () => {

    const [myArts, setMyArts] = useState([]);
    const [arts, setArts] = useState([]);
    const [userFromEmail, setUserFromEmail] = useState({});
    const {user, loading, setLoading} = useContext(AuthContext);

    useEffect(() => {
    if (!user?.email) return;
    const usrFrmEmil = async () => {
        try {
            const getUser = await axiosPublic.get('/user/info', {
                params: {
                    email: user.email
                },
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
            // setUserFromEmail(getUser.data);
            setArts(getUser.data.Artworks);
            setUserFromEmail(getUser.data);
        } catch (error) {
            console.error(error);
        }
    }

    
    usrFrmEmil();
    }, [user?.email]);

    // console.log(arts);
    // console.log(userFromEmail.Artworks);

    return (
        <div className='max-w-6xl flex flex-col justify-center w-full mx-auto px-7 transition-all py-10 gap-6'>
            <section>
                <div className='flex flex-col justify-center items-center gap-3'>
                   <Sparkles className='text-[#CA8A04] w-10 h-auto transition-colors'></Sparkles>
                   <h2 className='text-2xl font-bold transition-colors'>MY GALLERY</h2>
                   <p className='font-normal lg:w-xl text-center w-sm transition-colors'>Browse through our extensive collection of unique artworks curated from creators around the globe.</p>
                </div>
            </section>
            <section className='bg-accent/40 w-full py-15 border-t-3 border-accent rounded-2xl px-20 gap-4'>
                {(!arts || arts.length === 0) && (
                   <div className='flex justify-center items-center text-sm p-10 text-center'>
                       <p>NO ARTWORKS YOU HAVE!</p>
                   </div>
                )}
                {
                    arts && <>
                    <section className='grid lg:grid-cols-3 gap-5 grid-cols-1'>
                        {
                            arts.map(Art => <EditCard key={Art.id} Art={Art}></EditCard>)
                        }
                    </section>
                    </>
                }
            </section>
        </div>
    );
};

export default Gallery;