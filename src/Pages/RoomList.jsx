import { Card, CircularProgress, Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom";
import EmpireFirestoreService from "../Utility/Services/EmpireFirestoreService"
import shuffle from "../Utility/shuffle"
import { useQuery } from "@tanstack/react-query"
import DeleteIcon from '@mui/icons-material/Delete';
import { useAtom } from "jotai";
import { empireDataAtom } from '../State/Global.js'
import BasicTable from "../Components/BasicTable";

export const RoomList = () => {
    const [empireData, setEmpireData] = useAtom(empireDataAtom)
    const searchParams = useParams()
    const roomID = searchParams.id
    const names = useQuery(['getAllNames'], async ()=> await EmpireFirestoreService.getAllNames(roomID))
    const navigate = useNavigate();

    const deleteRoom = () => {
        EmpireFirestoreService.deleteRoom(roomID).then((response) => {
            console.log("Room deleted successfully.")
            setEmpireData({...empireData, roomID: null })
            navigate(`/`, { replace: false })
        }).catch((e) => {
            console.log("Error occured while deleting the room." + e)
        })
    }

    if(names.isLoading ){
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <CircularProgress/>
            </div>
    }

    if(names.isError ){
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <button onClick={()=> console.log(room)}></button>
            </div>
    }

    return <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <BasicTable rows={shuffle(names.data)}/>
        <Button 
            variant="outlined" 
            style={{color: 'red', borderColor: 'red'}}
            startIcon={<DeleteIcon />} 
            onClick={()=> deleteRoom()}
        >
            Delete Room
        </Button>
    </Card>
</div>

}