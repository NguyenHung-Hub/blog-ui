import CardInfo from "./Card/CardInfo";
import { ICountData } from "~/interfaces/dashboard";
const CardContainer = (props: ICountData | undefined) => {
  console.log("re-render count");

  return (
    <div className="mt-6 grid grid-cols-3 gap-10">
      <CardInfo
        name="Post"
        total={(props?.post?.hidden || 0) + (props?.post?.visibility || 0) || 0}
        visibility={props?.post?.visibility || 0}
        className="bg-green-200/60"
      />
      <CardInfo
        name="Resource"
        total={
          (props?.resource?.hidden || 0) + (props?.resource?.visibility || 0) ||
          0
        }
        visibility={props?.resource?.visibility || 0}
        className="bg-amber-200/60"
      />
    </div>
  );
};

export default CardContainer;
