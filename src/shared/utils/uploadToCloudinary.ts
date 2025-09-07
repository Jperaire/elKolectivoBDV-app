export async function uploadToCloudinary(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    form.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET
    );
    if (import.meta.env.VITE_CLOUDINARY_FOLDER) {
        form.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);
    }

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD
        }/auto/upload`,
        { method: "POST", body: form }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "Upload failed");
    return data.secure_url as string;
}
