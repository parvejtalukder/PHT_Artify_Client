import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthContext/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import axiosPublic from '../../../../Context/API/axiosPublic';

const EditForm = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    if (!id || !user?.accessToken) return;

    const getArtInfo = async () => {
      try {
        const res = await axiosPublic.get(`/artworks/${id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setArtwork(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load artwork");
      }
    };

    getArtInfo();
  }, [id, user]);

  if (!artwork) {
    return <div className="text-center py-10">Loading...</div>;
  }

const AddArtToDb = async (e) => {
  e.preventDefault();
  setLoading(true);

  const ArtWork = {
    title: e.target.title.value,
    imageURL: e.target.imageURL.value,
    category: e.target.category.value,
    medium: e.target.medium.value,
    description: e.target.description.value,
    dimensions: e.target.dimensions.value,
    price: e.target.price.value,
    visibility: e.target.visibility.value,
    artistId: artwork.artistId || user._id,
    updatedAt: new Date()
  };

  try {
    const res = await axiosPublic.patch(`/edit-art/${artwork._id}`, ArtWork, {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });

    setLoading(false);

    if (res.data === 1) {
      toast.success(`${ArtWork.title} Edited!`);
      setArtwork({ ...artwork, ...ArtWork });
    } else {
      toast.info('No changes were made.');
    }
  } catch (err) {
    setLoading(false);
    toast.error('Something went wrong while updating artwork.');
    console.error(err);
  }
};



  return (
    <div className="lg:max-w-6xl w-full mx-auto p-10">
      <section className="text-center mb-6">
        <h2 className="text-2xl font-bold">EDIT {artwork.title}</h2>
      </section>
      <form onSubmit={AddArtToDb} className="bg-accent w-full rounded-2xl 
                 px-6 py-8 
                 sm:px-10 sm:py-10 
                 lg:px-20 lg:py-14 
                 flex flex-col gap-10">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Title</legend>
      <input
        required
        type="text"
        name="title"
        className="input w-full"
        defaultValue={artwork.title}
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Image URL</legend>
      <input
        required
        type="url"
        name="imageURL"
        className="input w-full"
        defaultValue={artwork.imageURL}
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Medium</legend>
      <input
        required
        type="text"
        name="medium"
        className="input w-full"
        defaultValue={artwork.medium}
      />
    </section>

    <section className="lg:col-span-2">
      <legend className="fieldset-legend text-base-100 mb-1">Description</legend>
      <textarea
        required
        name="description"
        className="textarea w-full min-h-[120px] lg:min-h-[150px]"
        defaultValue={artwork.description}
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Dimensions</legend>
      <input
        type="text"
        name="dimensions"
        className="input w-full"
        defaultValue={artwork.dimensions}
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Price</legend>
      <input
        type="text"
        name="price"
        className="input w-full"
        defaultValue={artwork.price}
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Visibility</legend>
      <select
        name="visibility"
        className="select w-full"
        defaultValue={artwork.visibility}
      >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Category</legend>
      <select
        name="category"
        className="select w-full"
        defaultValue={artwork.category}
      >
        <option value="Landscape">Landscape</option>
        <option value="Painting">Painting</option>
        <option value="Portrait">Portrait</option>
        <option value="Abstract">Abstract</option>
        <option value="Urban">Urban</option>
        <option value="Digital Art">Digital Art</option>
      </select>
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Artist</legend>
      <input
        type="text"
        className="input w-full"
        value={user.displayName}
        readOnly
      />
    </section>

    <section>
      <legend className="fieldset-legend text-base-100 mb-1">Artist Email</legend>
      <input
        type="text"
        className="input w-full"
        value={user.email}
        readOnly
      />
    </section>

  </div>

  {/* Submit */}
  <section className="flex justify-center pt-4">
    <input
      type="submit"
      value="Update Artwork"
      className="bg-base-200 p-3 rounded-2xl w-full sm:w-1/2 lg:w-1/3"
    />
  </section>

</form>
      <ToastContainer />
    </div>
  );
};

export default EditForm;