
export const HistoryList: React.FC<{ history: string[] }> = ({ history }) => (
    <ul className="mt-3 text-sm list-disc list-inside text-gray-600">
        {history.map((item, i) => (
            <li key={i}>{item}</li>
        ))}
    </ul>
);
