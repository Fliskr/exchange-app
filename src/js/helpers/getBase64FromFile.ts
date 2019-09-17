export default async function getBase64(file: File) {
    return await new Promise((resolve, reject) => {
        if (file && file.name && file.size > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        } else {
            resolve(null);
        }
    });
}