import { Box, Card, CardContent, IconButton, TextField, Typography, CircularProgress, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FirestoreService from "../Utility/Services/FirestoreService"
import { useQuery } from "@tanstack/react-query"
import CustomizedSnackbars from "../Components/CustomizedSnackbars";
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAtom } from "jotai";
import { empireDataAtom } from '../State/Global.js'

export const Room = () => {
    const [empireData, setEmpireData] = useAtom(empireDataAtom)
    const searchParams = useParams()
    const roomID = searchParams.id
    const room = useQuery(['getRoom'], async ()=> await FirestoreService.getRoom(roomID))
    const names = useQuery(['getAllNames'], async ()=> await FirestoreService.getAllNames(roomID))
    const [nameCount, setNameCount] = useState(0)
    const [shareState, setShareState] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        if((room?.data?.error ?? null) != null){
            setEmpireData({...empireData, roomID: null })
            navigate(`/`, { replace: false })
        }
    }, [room])

    useEffect(() => {
        setNameCount((Object.keys(names?.data ?? []).length))
    }, [names])

    const deleteRoom = () => {
        FirestoreService.deleteRoom(roomID).then((response) => {
            console.log("Room deleted successfully.")
            setEmpireData({...empireData, roomID: null })
            navigate(`/`, { replace: false })
        }).catch((e) => {
            console.log("Error occured while deleting the room." + e)
        })
    }

    if(room.isLoading ){
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <CircularProgress/>
            </div>
    }

    if(room.isError ){
        return <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <button onClick={()=> console.log(room)}></button>
            </div>
    }

    return <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 300 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
                    <Button 
                        variant="outlined" 
                        style={{color: 'darkslategrey', borderColor: 'black'}}
                        startIcon={<AddIcon />} 
                        onClick={()=> navigate(`/AddName/${roomID}`, { replace: false })}
                    >
                        Add Name
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
                    <Button 
                        variant="outlined" 
                        style={{color: 'darkslategrey', borderColor: 'black'}}
                        startIcon={<ReceiptLongIcon />} 
                        onClick={()=> navigate(`/RoomList/${roomID}`, { replace: false })}
                    >
                        List {nameCount} Names
                    </Button>
                </div>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <IconButton 
                  onClick={()=> { 
                    navigator.clipboard.writeText(`https://smiley.dbservices.com/AddName/${roomID}`).then(()=> {
                        setShareState(true)
                      },(e)=>{
                        console.log(`Text Could Not Be Coppied: ${e}`)
                      }
                    )}}
                >
                    <ShareIcon></ShareIcon>
                </IconButton>
            </div>
        </Box>
        <Button 
                        variant="outlined" 
                        style={{color: 'red', borderColor: 'red', marginTop: 15}}
                        startIcon={<DeleteIcon />} 
                        onClick={()=> deleteRoom()}
                    >
                        Delete Room
                    </Button>
        <CustomizedSnackbars message={'Results copied to clipboard'} open={shareState} openFunction={setShareState} severity="success" />
    </Card>
</div>

}