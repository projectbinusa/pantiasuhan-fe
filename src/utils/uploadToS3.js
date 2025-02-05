// export const uploadImageToS3 = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("https://s3.lynk2.co/api/s3/profile", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Gagal mengupload gambar ke S3");
//       }

//       const data = await response.json();
//       if (data.data && data.data.url_file) {
//         console.log("URL gambar berhasil didapat:", data.data.url_file);
//         return data.data.url_file;
//       } else {
//         throw new Error("URL gambar tidak tersedia dalam respons S3");
//       }
//     } catch (error) {
//       console.error("Error upload ke S3:", error);
//       throw error;
//     }
//   };

export const uploadImageToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/profile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengupload gambar ke S3 (Status: ${response.status})`
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error("Gagal mengurai respons JSON dari S3");
    }

    if (data?.data?.url_file) {
      console.log("URL gambar berhasil didapat:", data.data.url_file);
      return data.data.url_file;
    } else {
      throw new Error("URL gambar tidak tersedia dalam respons S3");
    }
  } catch (error) {
    console.error("Error upload ke S3:", error.message);
    return null;
  }
};
