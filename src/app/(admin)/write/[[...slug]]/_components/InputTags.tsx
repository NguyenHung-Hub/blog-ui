import useDebounce from "~/hook/useDebounce";
import { createCategory, searchCategories } from "~/service/category";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ICategories } from "~/interfaces/category";

interface IInputTagsProps {
  className?: string;
  quantity?: number;
  maxLength?: number;
  setValues: React.Dispatch<React.SetStateAction<ICategories[]>>;
  values?: ICategories[];
}
const InputTags = ({
  className,
  quantity = 3,
  maxLength = 20,
  setValues,
  values = [],
}: IInputTagsProps) => {
  const [text, setText] = useState<string>("");
  const debouncedValue = useDebounce(text, 250);
  const [categories, setCategories] = useState<ICategories[]>([]);

  function categoryOnChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleRemove(index: number) {
    const newTags = [...values];
    newTags.splice(index, 1);
    setValues(newTags);
  }

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setCategories([]);
      return;
    }

    const fetchCategories = async () => {
      const res = await searchCategories(text);
      setCategories(res);
    };

    fetchCategories();
  }, [debouncedValue]);

  function handleChooseCategory(category: ICategories) {
    const find = values.find((i) => i._id == category._id);
    if (!find) {
      setValues([...values, category]);
      setText("");
    } else {
      alert(`${category.name} already exists!`);
    }
  }

  async function handleCreateCategory() {
    if (text.length > 1) {
      const res = await createCategory(text);
      if (res) {
        console.log(`file: InputTags.tsx:86 > res:`, res);

        setValues([...values, res]);
        setText("");
      }
    } else {
      alert("Tên danh mục tối thiểu phải có 2 kí tự.");
    }
  }

  return (
    <div
      className={`relative min-w-[160px] max-w-full rounded border border-slate-400 bg-white p-1 ${className}`}
    >
      <ul className="flex flex-wrap items-center">
        {values.length > 0 &&
          values.map((t, index) => {
            return (
              <li
                key={index}
                className="f-center py m-1 rounded border border-slate-400 bg-slate-100 px-1"
              >
                <span className="mr-1 select-none">{t.name}</span>
                <button
                  onClick={(e) => handleRemove(index)}
                  className="f-center h-3 w-3 rounded-full bg-gray-500"
                >
                  <Image
                    src={"/svg/cross-small.svg"}
                    width={12}
                    height={12}
                    alt={t.name}
                  />
                </button>
              </li>
            );
          })}
        {values.length < quantity && (
          <li className="flex-1">
            <input
              type="text"
              value={text}
              onChange={categoryOnChange}
              className="w-full min-w-[50px] outline-none"
              placeholder="Category"
              maxLength={maxLength}
            />
          </li>
        )}
      </ul>
      {values.length < 3 && text.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-auto rounded border border-slate-400 bg-white p-1">
          <ul>
            {categories.length == 0 && (
              <li
                onClick={(e) => handleCreateCategory()}
                className="flex cursor-pointer items-center justify-between px-1 py-0.5 hover:bg-slate-200"
              >
                <span> {text}</span>
                <span className="rounded-sm bg-green-500 px-2 py-0.5 text-12 text-white">
                  New
                </span>
              </li>
            )}
            {categories.length > 0 &&
              categories.map((j) => {
                return (
                  <li
                    key={j._id}
                    onClick={(e) => handleChooseCategory(j)}
                    className="cursor-pointer p-0.5 hover:bg-slate-200"
                  >
                    {j.name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputTags;
