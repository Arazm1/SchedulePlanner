import { useEffect, useState } from "react"
import { useCompany, useShift } from "../../hooks/apiHooks";


const AddShiftModal = ({ onClose, onShiftAdded }) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);

    const {getCompanies} = useCompany();
    const {postShift} = useShift();


    const initValues = {
        shiftName: '',
        shiftInfo: '',
        shiftNotes: '',
        startTime: '',
        endTime: '',
        companyID: '',
    };

    const doCreateShift = async () => {
        setError('');

        if(!inputs.companyID){
            setError('Please select the Company');
            return;
        }

        if(new Date(inputs.startTime) >= new Date(inputs.endTime)){
            setError('End time must be after start time');
            return;
        }

        setLoading(true);

        try{
            const newShift = await postShift({
                shiftName: inputs.shiftName,
                shiftInfo: inputs.shiftInfo,
                shiftNotes: inputs.shiftNotes,
                startTime: inputs.startTime,
                endTime: inputs.endTime,
                companyID: parseInt(inputs.companyID),
            });
            onShiftAdded(newShift);
            onClose();
        }
        catch(e){
            setError(e.message || 'Failed to create shift');
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doCreateShift, initValues);


    useEffect(() => {
        const fetchCompanies = async () => {
            try{
                const result = await getCompanies();
                setCompanies(result);
            }
            catch (error){
                console.log('Error ', error.message)
            }
        };
        fetchCompanies();
    }, []);


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#13131a] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white font-semibold text-lg">Add shift</h2>
                    <button onClick={onClose} className="text-white/30 hover:text-white/60 cursor-pointer">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/40 uppercase tracking-wider">Job</label>
                        <select name="companyID" value={inputs.companyID} onChange={handleInputChange}
                            className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500" required>
                            <option value="">Select a job...</option>
                            {companies.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/40 uppercase tracking-wider">Shift name</label>
                        <input type="text" name="shiftName" value={inputs.shiftName} onChange={handleInputChange}
                            placeholder="e.g. Morning shift"
                            className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500" required />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-white/40 uppercase tracking-wider">Start time</label>
                            <input type="datetime-local" name="startTime" value={inputs.startTime} onChange={handleInputChange}
                                className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-white/40 uppercase tracking-wider">End time</label>
                            <input type="datetime-local" name="endTime" value={inputs.endTime} onChange={handleInputChange}
                                className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500" required />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/40 uppercase tracking-wider">Info</label>
                        <input type="text" name="shiftInfo" value={inputs.shiftInfo} onChange={handleInputChange}
                            placeholder="e.g. Opening duties"
                            className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500" required />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-white/40 uppercase tracking-wider">Notes <span className="text-white/20 normal-case">(optional)</span></label>
                        <textarea name="shiftNotes" value={inputs.shiftNotes} onChange={handleInputChange}
                            placeholder="Any extra notes..." rows={2}
                            className="bg-[#1c1c28] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-indigo-500 resize-none" />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <div className="flex gap-3 mt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/70 text-sm py-2.5 rounded-xl transition-colors cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer">
                            {loading ? 'Adding...' : 'Add shift'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};


export default AddShiftModal;