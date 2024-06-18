import { useModal } from '../hooks/useModal';

function Modal({ onYesHandler }) {
  const modal = useModal();
  return (
    <div
      onClick={modal.closeModal}
      className="fixed left-0 top-0 right-0 bottom-0
  bg-black/50 flex items-center justify-center z-[99]"
    >
      <div className="bg-white w-80 h-40 rounded-lg flex items-center justify-center flex-col divide-y-2 divide-solid">
        <div className="flex justify-center items-center w-[400px] h-full">정말로 삭제하시겠습니까?</div>
        <div
          className="flex justify-center items-center size-full 
          divide-x-2 divide-solid"
        >
          <div className="flex justify-center items-center w-1/2 h-full">
            <button
              className="size-full hover:bg-gray-100 rounded-bl-md 
                active:bg-gray-200 active:shadow-inner"
              onClick={onYesHandler}
            >
              네
            </button>
          </div>
          <div className="flex justify-center items-center w-1/2 h-full">
            <button
              onClick={modal.closeModal}
              className="size-full hover:bg-gray-100 rounded-br-md 
                active:bg-gray-200 active:shadow-inner"
            >
              아니요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
