import { Box, Card, CardContent, IconButton, TextField, Typography, CircularProgress, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FirestoreService from "../Utility/Services/FirestoreService"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai";
import { empireDataAtom } from '../State/Global.js'

export const AddName = () => {
    const [empireData, setEmpireData] = useAtom(empireDataAtom)
    const searchParams = useParams()
    const roomID = searchParams.id
    const room = useQuery(['getRoom'], async ()=> await FirestoreService.getRoom(roomID))
    const names = useQuery(['getAllNames'], async ()=> await FirestoreService.getAllNames(roomID))
    const [name, setName] = useState((empireData?.name ?? ''))
    const navigate = useNavigate();
    
    useEffect(() => {
        if((room?.data?.error ?? null) != null){
            setEmpireData({roomID: null, name: null, nameID: null})
            navigate(`/`, { replace: false })
        }
    }, [room])

    const updateName = () => {

        const nameData = {
            name: name,
            roomID: roomID
        }

        if(empireData.nameID != null){
            FirestoreService.updateName(empireData.nameID, nameData).then((response) => {
                console.log("Room updated successfully.")
                setEmpireData({...empireData, name: name })
                navigate(`/`, { replace: false })
            }).catch((e) => {
                console.log("Error occured while adding the room." + e)
            })
        }
        else{
            FirestoreService.addName(nameData).then((response) => {
                console.log("name added successfully.")
                setEmpireData({...empireData, name: name, nameID: response })
                navigate(`/`, { replace: false })
            }).catch((e) => {
                console.log("Error occured while adding the room." + e)
            })
        }
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

    return <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 300 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography style={{ textAlign: 'center' }}>
                    Empires: Name Game
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
                    <TextField
                        inputProps={{style: {'textAlign': 'center'}}}
                        id="outlined-name"
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Button 
                        variant="outlined" 
                        style={{color: 'darkslategrey', borderColor: 'black'}}
                        startIcon={<AddIcon />} 
                        onClick={()=> updateName()}
                    >
                        Update
                    </Button>
                </div>
            </CardContent>
        </Box>
    </Card>
</div>

}