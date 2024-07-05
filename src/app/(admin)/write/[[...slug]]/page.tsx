"use client";
import "./styles.css";
import Button from "~/components/Button/Button";
import TipTapEditor from "~/components/Editor/Tiptap/Tiptap";
import Input from "~/components/Input/Input";
import InputTags from "~/app/_components/InputTags";
import { getPost, savePost, updatePost } from "~/service/post";
import { uploadImage } from "~/service/upload";
import { useAppDispatch, useAppSelector } from "~/store";
import { ICategories } from "~/interfaces/category";
import {
  IDataImg,
  addImageItem,
  changeImageAlt,
  changeImageCurrent,
} from "~/store/reducer/editor";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import IsAuthRoute from "~/app/_components/IsAuth";
import { ICreatePost } from "~/interfaces/post";
import Upload from "~/components/Upload";
import TextArea from "~/components/TextArea/TextArea";

type CustomFile = File & {
  preview: string;
};

function WritePage({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const editorStore = useAppSelector((state) => state.editor);
  const imgCurrent = useAppSelector((state) => {
    return state.editor.list.find(
      (i) => i.id == editorStore.current.id,
    ) as IDataImg;
  });
  const router = useRouter();

  const [file, setFile] = useState<CustomFile>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isSave, setIsSave] = useState(true);
  const [shortDescription, setShortDescription] = useState<string>("");

  useEffect(() => {
    async function getPostEdit(slug: string) {
      const post = await getPost(slug);
      if (post) {
        setThumbnailUrl(post.photo);
        setTitle(post.title);
        setSlug(post.slug);
        setPostId(post._id);
        const cates = post.categories.map<ICategories>((i) => ({
          _id: i._id,
          name: i.name,
          slug: i.slug,
        }));
        setCategories(cates);
        console.log("set content parent");

        setContent(post.description);
        // setTimeout(() => {}, 1000);
      } else {
        router.replace("/write");
      }
    }

    if (params.slug) {
      getPostEdit(params.slug);
    }
  }, [params.slug]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleChooseImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as CustomFile;
      file.preview = URL.createObjectURL(file);
      setFile(file);
    }
  };

  const handlePublishPost = async () => {
    if (title == "") {
      alert("title empty");
      return;
    }
    if (content == "") {
      alert("content empty");
      return;
    }

    if (categories.length == 0) {
      alert("category empty");
      return;
    }
    if (shortDescription.length == 0) {
      alert("short description empty");
      return;
    }

    if (!file && thumbnailUrl == "") {
      alert("thumbnail empty");
      return;
    }

    const newPost: ICreatePost = {
      author: user.user._id,
      title,
      description: content,
      shortDescription: shortDescription,
      photo: thumbnailUrl,
      categories: [...categories.map((i) => i._id)],
      status: "visibility",
    };

    if (file) {
      try {
        const data = new FormData();
        data.append("file", file);

        const resultUpload = await uploadImage(data);
        if (resultUpload) {
          newPost.photo = resultUpload.url;
          setThumbnailUrl(resultUpload.url);
        }
      } catch (error) {
        console.log(error);
      }
    }

    try {
      if (postId == "") {
        const result = await savePost(newPost);
        if (result) {
          console.log(`file: page.tsx:123 > result:`, result);
          setPostId(result._id);
          setSlug(result.slug);
          setIsSave(true);
        }
      } else {
        const result = await updatePost({ ...newPost, _id: postId });
        console.log(`file: page.tsx:128 > result updated:`, result);
        if (result) {
          setPostId(result._id);
          setSlug(result.slug);
          setIsSave(true);
          if (slug != result.slug) {
            router.replace(`/write/${result.slug}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  useEffect(() => {
    let observer: MutationObserver;
    const targetNode = document.getElementById("editor-wrapper");
    if (targetNode) {
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
      };

      observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            if (mutation.addedNodes[0] instanceof HTMLImageElement) {
              const img = mutation.addedNodes[0];
              const id = `image-${Date.now() - 1690000000000}`;
              const alt = "Default alt image";
              img.id = id;
              img.setAttribute("width", img.naturalWidth.toString());
              img.setAttribute("height", img.naturalHeight.toString());
              img.setAttribute("loading", "lazy");
              img.setAttribute("decoding", "async");
              img.setAttribute("alt", alt);

              const imgTemp = {
                id,
                alt: alt,
                height: img.naturalHeight,
                width: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                naturalWidth: img.naturalWidth,
                src: img.src,
              };
              img.addEventListener("click", () => {
                dispatch(addImageItem(imgTemp));
                dispatch(changeImageCurrent(imgTemp));
              });
            }
          }
        }
      });

      observer.observe(targetNode, config);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setIsSave(false);
  }, [title, content, file, thumbnailUrl, categories]);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const img = document.getElementById(
      editorStore.current.id,
    ) as HTMLImageElement;

    if (e.target.name == "alt") {
      dispatch(
        changeImageAlt({
          id: editorStore.current.id,
          alt: e.target.value,
        }),
      );
      if (img) {
        img.alt = e.target.value;
      }
    }
  }

  function handleViewPost() {
    if (slug != "") {
      window.open(`${process.env.NEXT_PUBLIC_BASE_URL_POST}/${slug}`);
    }
  }

  return (
    <React.Fragment>
      <main className="flex h-screen w-full">
        <div className="main-editor flex h-full flex-col items-center py-2">
          <div className="h-full w-full">
            <div className="f-center mb-4 h-12 w-full bg-white px-2">
              <Link href={"/"} className="mx-4">
                <Image
                  src={"/svg/home-1.svg"}
                  width={32}
                  height={32}
                  className="h-auto w-auto"
                  alt="Home icon"
                />
              </Link>
              <input
                className="mr-4 w-full border-l-2 border-primary p-2 text-xl outline-none"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="mr-2">
                {isSave ? (
                  <Image
                    src={"/svg/fi_check-circle.svg"}
                    width={32}
                    height={32}
                    className="h-auto w-auto"
                    alt="Home icon"
                  />
                ) : (
                  <Image
                    src={"/svg/fi_x-circle.svg"}
                    width={32}
                    height={32}
                    className="h-auto w-auto"
                    alt="Home icon"
                  />
                )}
              </div>
              <Button
                rounded
                primary
                onClick={handlePublishPost}
                className="mx-1"
              >
                Save
              </Button>
              <Button
                rounded
                primary
                className="bg-sky-600 font-semibold text-white"
                onClick={handleViewPost}
              >
                View
              </Button>
            </div>

            <div className="editor-wrapper w-full" id="editor-wrapper">
              <TipTapEditor content={content} setContent={setContent} />
            </div>
          </div>
        </div>
        <div className="flex w-360 flex-col items-center border border-l border-l-gray-300 bg-white px-4 shadow-sm">
          <div className="mt-4">
            <Upload
              url={thumbnailUrl}
              width={320}
              height={176}
              file={file}
              setFile={setFile}
              className=""
            />

            <div className="mt-4">
              <label>Categories</label>
              <InputTags values={categories} setValues={setCategories} />
            </div>

            <div>
              <TextArea
                title="Short Description"
                onChange={(e) => setShortDescription(e.target.value)}
                value={shortDescription}
                className="mt-8"
                rows={5}
                maxLength={256}
              ></TextArea>
            </div>

            <div className="mt-4">
              {editorStore.current.id && (
                <>
                  <img
                    src={editorStore.current.src}
                    alt="alt temp"
                    width={240}
                    height={180}
                    className="w-full rounded"
                  />
                  <Input
                    title="Alt"
                    value={imgCurrent?.alt}
                    name="alt"
                    onChange={handleImageChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
export default IsAuthRoute(WritePage);
