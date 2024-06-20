import { CustomFile } from "~/types/common";
import Image from "next/image";
import React, { ChangeEvent } from "react";

interface IProps {
  url: string;
  className?: string;
  width: number;
  height: number;
  setFile: Function;
  file: CustomFile | undefined;
}

const Upload = ({
  url = "",
  width = 320,
  height = 176,
  className = "",
  file,
  setFile,
}: IProps) => {
  const keyId = Math.floor(Math.random() * 100);
  const handleChooseImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as CustomFile;
      if (file) {
        file.preview = URL.createObjectURL(file);
        setFile(file);
      }
    }
  };

  return (
    <div
      className={className}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {(function () {
        if (file) {
          return (
            <div className="relative h-full w-full overflow-hidden rounded-sm">
              <label
                htmlFor={`file_${keyId}`}
                className="f-center group absolute inset-0 cursor-pointer hover:bg-black/10"
              >
                <img
                  className="invisible h-8 w-8 group-hover:visible"
                  src={"/svg/camera.svg"}
                  alt="camera icon"
                />
              </label>
              <img
                className="h-full w-full object-cover"
                src={file.preview}
                alt="img"
              />
            </div>
          );
        }
        if (url != "") {
          return (
            <div className="relative h-full w-full overflow-hidden rounded-sm">
              <label
                htmlFor={`file_${keyId}`}
                className="f-center group absolute inset-0 cursor-pointer hover:bg-black/10"
              >
                <img
                  className="invisible h-8 w-8 group-hover:visible"
                  src={"/svg/camera.svg"}
                  alt="camera icon"
                />
              </label>
              <Image
                className={`h-full w-full object-cover`}
                priority={true}
                loading="eager"
                quality={95}
                width={320}
                height={180}
                src={url}
                alt="img"
              />
            </div>
          );
        }

        return (
          <div
            className={`h-full w-full border-2 border-dashed border-gray-400`}
          >
            <label
              htmlFor={`file_${keyId}`}
              style={{ lineHeight: `${height}px` }}
              className="block h-full w-full cursor-pointer select-none text-center text-gray-400"
            >
              Choose image
            </label>
          </div>
        );
      })()}

      <input
        type="file"
        name={`file_${keyId}`}
        id={`file_${keyId}`}
        style={{ display: "none" }}
        onChange={handleChooseImage}
        accept="image/png, image/gif, image/jpeg, image/jpg"
      />
    </div>
  );
};

export default Upload;
