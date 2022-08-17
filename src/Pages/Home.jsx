import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import FirestoreService from "../Utility/Services/FirestoreService"
import AddIcon from '@mui/icons-material/Add';
import { useAtom } from "jotai";
import { empireDataAtom } from '../State/Global.js'
import CustomizedSnackbars from "../Components/CustomizedSnackbars"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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
                    { empireData.roomID == null ?
                    <Button 
                        variant="outlined" 
                        style={{color: 'darkslategrey', borderColor: 'black'}}
                        startIcon={<AddIcon />} 
                        onClick={()=> addRoom()}
                    >
                        New Room
                    </Button>
                    :
                    <Button 
                        variant="outlined" 
                        style={{color: 'darkslategrey', borderColor: 'black'}}
                        startIcon={<MeetingRoomIcon />} 
                        onClick={()=> addRoom()}
                    >
                        Open Room
                    </Button>
                    }
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
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    One person creates a room and shares the room link or ID for the other players to join.
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    Players enter a famous person so others do not know who they have chosen.
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    Once all names have been entered, the room creator will then read the names out loud once or twice.
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    Once the game has begun - the names are NOT to be read out again. It is up to the players to remember what names have been read out.
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    After the names have been read out, nominate a player to start the game. Player A asks player B if they are insert a name that has been read out. If player A guesses right, then player B joins player A's empire. If player A is wrong, then player B gets control of the game and gets the chance to build their empire.
                    The game gets slightly complex here. If player A has an empire, another player (player C) can go after player A's entire empire. To do this, player C must guess who player A is, as player A is the head of the group. If player C is correct, player A and all of their empire joins player C's empire.
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    Once a player joins an empire, they can not be seperated from it, only the head of the empire can be guessed.   
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    Players in an empire can confer between themselves - however, it is up to the head of the empire to make the statement and ask the other player. (This is were communication comes in, as players will forget the famous people, so collectively they can work out who is left.)
                </Typography>
                <Typography style={{ textAlign: 'center', padding: 5 }}>
                    The game continues until one player has all the other players in their empire.
                </Typography>
            </CardContent>
        </Box>
    </Card>
</div>

}