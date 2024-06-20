"use client";
import ModalBase from "~/components/Modal/ModalBase";
import Input from "~/components/Input/Input";
import Button from "~/components/Button/Button";
import { useEffect, useState, useCallback } from "react";
import { isValidUrl } from "~/util/regex";
import Tabs from "~/components/Tab/Tabs";
import Tab from "~/components/Tab/Tab";
import Upload from "~/components/Upload";
import { CustomFile } from "~/types/common";
import { uploadImage } from "~/service/upload";

interface ModalUploadTiptapProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setURL: React.Dispatch<React.SetStateAction<string>>;
}

const ModalUploadTiptap = ({
  setShowModal,
  showModal,
  setURL,
}: ModalUploadTiptapProps) => {
  const [url, setUrl] = useState({ tab1: "", tab2: "" });
  const [error, setError] = useState({ tab1: "", tab2: "" });
  const [activeTab, setActiveTab] = useState(0);
  const [file, setFile] = useState<CustomFile | undefined>();
  const [disableBtn, setDisableBtn] = useState(true);

  const validateUrl = useCallback((url: string) => {
    return isValidUrl(url) ? "" : "Invalid url";
  }, []);

  const onClickSave = useCallback(async () => {
    if (activeTab === 0) {
      const errorMsg = validateUrl(url.tab1);
      if (!errorMsg) {
        setURL(url.tab1);
        setShowModal(false);
      } else {
        setError((prev) => ({ ...prev, tab1: errorMsg }));
      }
    } else if (activeTab === 1 && file) {
      try {
        const data = new FormData();
        data.append("file", file);
        const resultUpload = await uploadImage(data);
        if (resultUpload) {
          setURL(resultUpload.url);
          setShowModal(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [activeTab, url, file, setURL, setShowModal, validateUrl]);

  const onClickCancel = useCallback(() => {
    setShowModal(false);
    setError({ tab1: "", tab2: "" });
    setFile(undefined);
    setUrl({ tab1: "", tab2: "" });
  }, [setShowModal]);

  useEffect(() => {
    if (url.tab1 != "") {
      setError((prev) => ({ ...prev, tab1: validateUrl(url.tab1) }));
    } else {
      setError((prev) => ({ ...prev, tab1: "" }));
    }
  }, [url.tab1, validateUrl]);

  useEffect(() => {
    if (activeTab === 0) {
      setDisableBtn(!isValidUrl(url.tab1));
    } else if (activeTab === 1) {
      setDisableBtn(!file);
    }
  }, [activeTab, url.tab1, file]);

  return (
    <ModalBase setShowModal={setShowModal} showModal={showModal}>
      <div className="h-max">
        <p className="text-xl font-semibold">Insert Image</p>

        <Tabs onChange={(index) => setActiveTab(index)} className="w-full">
          <Tab title="URL" className="flex h-48 w-full flex-col justify-center">
            <Input
              title="URL"
              value={url.tab1}
              onChange={(e) =>
                setUrl((prev) => ({ ...prev, tab1: e.target.value }))
              }
            />
            {error.tab1 && (
              <p className="mb-1 text-sm text-red-500">*{error.tab1}</p>
            )}
          </Tab>
          <Tab title="File" className="f-center h-48">
            <Upload
              url=""
              width={320}
              height={176}
              file={file}
              setFile={setFile}
              className=""
            />
          </Tab>
        </Tabs>
        <div className="flex justify-end">
          <Button primary rounded onClick={onClickCancel}>
            Cancel
          </Button>
          <Button
            disabled={disableBtn}
            success
            rounded
            className="ml-4"
            onClick={onClickSave}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ModalUploadTiptap;
