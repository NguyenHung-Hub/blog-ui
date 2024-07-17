const Tag = ({ name }: { name: string }) => {
  return (
    <div className="inline-block flex-shrink-0 rounded-full bg-blue-light px-2 py-1 text-xs dark:bg-gray-600 [&:not(:last-child)]:mr-2">
      <span>#{name}</span>
    </div>
  );
};

export default Tag;
