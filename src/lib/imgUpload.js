export const imageUpload = async (image) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (data.success) {
    return data.data.display_url; // 👈 সরাসরি ছবির লাইভ URL স্ট্রিং রিটার্ন করবে
  } else {
    throw new Error(data.error?.message || "ImgBB upload failed");
  }
};
