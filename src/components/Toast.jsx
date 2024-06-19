import { useEffect, useState } from 'react';
import { useToast } from '../hooks/useToast';

export default function Toast({ title, content, time, toastId }) {
  const [visible, setVisible] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        toast.deleteToast(toastId);
      }, 500);
      setVisible(false);
    }, time);
  }, [toast, toastId, time]);

  const deleteToastHandler = () => {
    setTimeout(() => {
      toast.deleteToast(toastId);
    }, 500);
    setVisible(false);
  };

  return (
    <article
      onClick={() => deleteToastHandler()}
      className={`shadow-lg
        w-[320px]
        h-[90px]
        border
        p-6
        rounded-lg
        text-sm
        cursor-pointer
        bg-white
        hover:bg-gray-50
        active:bg-gray-200`}
    >
      <h6 className="font-semibold line-clamp-1">{title}</h6>
      <p className="line-clamp-1">{content}</p>
    </article>
  );
}
