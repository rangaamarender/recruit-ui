export const timesheetValidateFileType = (file) => {
    const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "application/pdf",
        "image/svg+xml",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    return allowedFileTypes.includes(file.type);
};

export const documentsValidateFileType = (file) => {
    const allowedFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'application/pdf',
        'image/svg+xml',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    return allowedFileTypes.includes(file.type);
};



export const validateFileSize = (file) => {
    const maxSizeBytes = 30 * 1024 * 1024;
    return file.size <= maxSizeBytes;
};