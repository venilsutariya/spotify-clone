"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser(); 
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if(!imageFile || !songFile || !user){
        toast.error("Missing Fields!")
        return;
      }

      const uniqueID = uniqid();

      // upload song
      const {
        data: songData,
        error: songError
      } = await supabaseClient
      .storage
      .from('songs')
      .upload(`song-${values.title}-${uniqueID}` , songFile , {
        cacheControl: '3600',
        upsert: false,
      })
      if(songError){
        setIsLoading(false)
        return toast.error("song upload Failed!");
      }

      // uplaod image
      const {
        data: imageData,
        error: imageError
      } = await supabaseClient
      .storage
      .from('images')
      .upload(`image-${values.title}-${uniqueID}` , imageFile , {
        cacheControl: '3600',
        upsert: false,
      })

      if(imageError){
        setIsLoading(false);
        return toast.error("Failed Image upload");
      }

      const {
        error: supabaseError
      } = await supabaseClient
      .from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      })

      if(supabaseError){
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song Created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title='Add a song'
      description='upload an Mp3 file'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} action=""
        className='flex flex-col gap-y-4'>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Author Name"
        />
        <div>
          <div className='pb-1'>
            Select a Song File
          </div>
          <Input
            id="song"
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>
            Select an image
          </div>
          <Input
            id="image"
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal;
