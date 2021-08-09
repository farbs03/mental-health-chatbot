import React, {useState, useEffect, useRef} from "react"

import {
  Typography,
  Button,
  TextField,
  ThemeProvider,
  IconButton,
  Input,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Paper,
  InputBase,
  Avatar,
  Badge
} from "@material-ui/core"

import { createTheme, withStyles } from '@material-ui/core/styles';

import {blue} from "@material-ui/core/colors"

import SendIcon from "@material-ui/icons/Send"
import { AccountCircle } from "@material-ui/icons";

import { motion } from "framer-motion";

import ChatbotLogo from "./chatbot.png"

localStorage.setItem("messages", JSON.stringify([]))

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Messages = () => {
  var currMessages = JSON.parse(localStorage.getItem('messages'))
  return (
    <div>
      {currMessages.map((message, index) => (
        <>
          {index % 2 === 0 ?
            (
              <>
                <motion.div
                  initial={{opacity: 0, y: 10, x: 10}}
                  animate={{opacity: 1, y: 0, x: 0}}
                  style={{
                    float: "right",
                    clear: "right",
                    marginBottom: "5px", 
                    padding: "10px", 
                    maxWidth: "50%", 
                    width: "auto", 
                    borderRadius: "18px", 
                    background: blue[400], 
                    color: 'white'
                  }}
                  id={index}
                  key={index}
                >
                  <Typography>{message['text']}</Typography>
                </motion.div>
                <br></br>
                <br></br>
              </>
            )
            :
            <>
              <motion.div
                initial={{opacity: 0, y: 10, x: -10}}
                animate={{opacity: 1, y: 0, x: 0}}
                style={{
                  float: "left",
                  clear: "left",
                  marginBottom: "5px",
                  padding: "10px", 
                  maxWidth: "50%",  
                  borderRadius: "18px", 
                  background: "#ccc", 
                  color: 'black'
                }}
                id={index}
                key={index}
              >
                <Typography>{message['text']}</Typography>
              </motion.div>
              <br></br>
              <br></br>
            </>
          }
        </>
        
      ))}
    </div>
  )
}

const ChatbotAvatar = () => {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
      style={{display: "inline-block", borderRadius: "50%", marginLeft: "5px", background: "rgb(240, 240, 240)"}}
    >
      <Avatar alt="Chatbot" src={ChatbotLogo} />
    </StyledBadge>
  )
}

const App = () => {
  
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: blue[400]
      },
    }
  });

  const [message, setMessage] = useState('')


  const sendMessage = (e) => {
    e.preventDefault()
    if(message !== "") {
      var currUserMessages = JSON.parse(localStorage.getItem("messages"));
      currUserMessages.push({"type": "user", "text": message})
      setMessage("")
      localStorage.setItem("messages", JSON.stringify(currUserMessages))
    }
  }
  
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  const handleKeypress = (e) => {
      //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      sendMessage();
      console.log('sent')
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <div className="App" style={{padding: "10px"}}>

        <Paper 
          style={{
            width: "350px",
            height: "556px",
            borderRadius: "20px",
            position: "absolute",
            top: "50%",
            left:"50%",
            transform: "translate(-50%, -50%)"
          }} 
          elevation={6}
        >
          <div style={{borderBottom: "1px solid #ccc"}}>
            <ChatbotAvatar />
            <Typography variant="h3" style={{ fontSize: "18px", fontWeight: "bold", padding: "10px", display: "inline-block", lineHeight: "40px"}}>Mental Health Chatbot</Typography>
          </div>

          <div ref={messageEl} style={{height: "400px", overflowY: "auto", overflowX: "hidden", padding: '10px'}}>
              <Messages />
          </div>

          <br></br>

          <div style={{borderTop:"1px solid #ccc"}}>
            <form onSubmit={sendMessage}>
              <FormControl variant="outlined" fullWidth>
                <InputBase
                  value={message}
                  onChange={(e) => (setMessage(e.target.value))}
                  placeholder="Send a message"
                  fullWidth
                  onKeyPress={handleKeypress}
                  style={{
                    padding: "12px"
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        type='submit'
                        onClick={sendMessage}
                        edge="end"
                        color="primary"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </div>

        </Paper>

      </div>

    </ThemeProvider>
  );
}

export default App;
