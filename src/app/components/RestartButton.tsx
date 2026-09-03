import { useRouter } from 'next/navigation';
import { MdRefresh } from 'react-icons/md';

const RestartButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/landing');
  };

  return (
    <button className="mx-auto" onClick={handleClick}>
      <div className="p-5 text-lg bg-transparent text-gray-600 rounded-lg border border-gray-600 shadow-lg">
        <MdRefresh size={40} style={{ transform: 'scaleX(-1)' }} />
      </div>
    </button>
  );
};

export default RestartButton;
