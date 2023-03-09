import { useRecoilState } from "recoil";
import modalState from "../atoms/modalAtom";

export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Upload Modal</h1>
      {open && <h1>Modal is open</h1>}
    </div>
  );
}
