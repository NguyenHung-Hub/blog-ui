import Link from "next/link";

export default function NotFound() {
  return (
    <main className="f-center h-screen w-full">
      <div className="fc-center">
        <div className="flex text-8xl font-extrabold">
          <p className="text-blue-400">4</p>
          <p className="text-pink-400">0</p>
          <p className="text-green-400">4</p>
        </div>
        <h2 className="text-3xl font-bold">Something's missing.</h2>
        <div className="fc-center mt-4">
          <p className="text-center">
            Xin lỗi, chúng tôi không thể tìm thấy trang đó.
          </p>
          <p className="text-center">
            Bạn sẽ tìm thấy rất nhiều điều để khám phá trên trang chủ.
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 rounded-md border border-gray-400 px-6 py-2 font-semibold hover:bg-blue-1 hover:text-white"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </main>
  );
}
