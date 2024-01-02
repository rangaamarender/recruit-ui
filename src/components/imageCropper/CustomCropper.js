import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from 'primereact/button';
import { getCroppedImg } from './ImageCrop';

const CustomCropper = ({ getBlob, image, onClickCancel, onClickSave,buttonLabel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = async (_, croppedAreaPixels) => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        getBlob(croppedImage);
    };
    const handleZoomIn = () => {
        setZoom((prevZoom) => prevZoom + 0.1);
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(1, prevZoom - 0.1));
    };
    return (
        <div className=''>
            <div className="cropper-container h-18rem w-auto">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className=''>
                <div className="my-2">
                    <div className="flex justify-content-center">
                        <Button icon="pi pi-search-minus" text onClick={handleZoomOut} />
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                                setZoom(e.target.value);
                            }}
                            className="zoom-range w-7 "
                        />
                       <Button icon="pi pi-search-plus" text onClick={handleZoomIn} />
                    </div>
                    <div>
                        <div className="flex justify-content-center gap-2 mb-3">
                            <Button label="Cancel" size="small" severity="secondary" onClick={onClickCancel} />
                            <Button label={buttonLabel} size="small" onClick={onClickSave} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomCropper;
