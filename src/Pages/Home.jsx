import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import FirestoreService from "../Utility/Services/FirestoreService"
import AddIcon from '@mui/icons-material/Add';
import { useAtom } from "jotai";
import { empireDataAtom } from '../State/Global.js'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CustomizedHelpDialog from '../Components/CustomizedHelpDialog';

export const Home = () => {
    const [empireData, setEmpireData] = useAtom(empireDataAtom)
    const [room, setRoom] = useState('')
    const navigate = useNavigate();

    const addRoom = () => {
        const roomID = crypto.randomUUID().substr(0, 6).toUpperCase()

        if(empireData.roomID != null){
            navigate(`/Room/${empireData.roomID}`, { replace: false })
        }
        else{
            FirestoreService.addRoom(roomID).then((response) => {
                console.log("Room added successfully.")
                setEmpireData({roomID: roomID, name: null, nameID: null})
                navigate(`/Room/${roomID}`, { replace: false })
            }).catch((e) => {
                console.log(`Error occured while adding the room ${roomID}. ${e}` )
            })
        }
    }

    return <div style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
    <Card sx={{ maxWidth: 850, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 300 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 5}}>
                    <div style={{width: 40}}></div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: 40}}>
                        { empireData.roomID == null ?
                        <Button 
                            variant="outlined" 
                            style={{color: 'darkslategrey', borderColor: 'black', width: 150}}
                            startIcon={<AddIcon />} 
                            onClick={()=> addRoom()}
                        >
                            New Room
                        </Button>
                        :
                        <Button 
                            variant="outlined" 
                            style={{color: 'darkslategrey', borderColor: 'black', width: 150}}
                            startIcon={<MeetingRoomIcon />} 
                            onClick={()=> addRoom()}
                        >
                            Open Room
                        </Button>
                        }
                    </div>
                    <div >
                        <CustomizedHelpDialog 
                            message={'One person creates a room and shares the room link or ID for the other players to join. Players enter a famous person so others do not know who they have chosen. Once all names have been entered, the room creator will then read the names out loud once or twice. Once the game has begun - the names are NOT to be read out again. It is up to the players to remember the names. Nominate a player to start the game. Player A asks player B if they are [insert a name on the list]. If player A guesses right, then player B joins player A\'s empire. If player A is wrong, then player B gets control of the game and gets the chance to build their empire. Once a player joins an empire, they can not be seperated from it, only the head of the empire (person that has not been guessed) can be guessed. Players in an empire can confer between themselves - however, it is up to the head of the empire to make the statement and ask the other player. The game continues until one player has all the other players in their empire.'} 
                            title={'How to Play'}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: 15 }}>
                    <div style={{width: 40}}></div>
                    <TextField
                        inputProps={{maxLength: 6, style: {'textAlign': 'center', 'padding': '25'}}}
                        id="outlined-name"
                        label="Room"
                        value={room}
                        onChange={e => setRoom(e.target.value)}
                    />
                    <IconButton onClick={()=> (navigate(`/AddName/${room}`, { replace: false }))}>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                </div>
            </CardContent>
        </Box>
    </Card>
</div>

}