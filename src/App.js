import React, {useState} from "react"

import {
  Typography,
  Button,
  TextField,
  ThemeProvider,
  IconButton,
  Input,
  OutlinedInput,
  InputAdornment,
  FormControl
} from "@material-ui/core"

import { createTheme } from '@material-ui/core/styles';

import {blue} from "@material-ui/core/colors"

import SendIcon from "@material-ui/icons/Send"
import { AccountCircle } from "@material-ui/icons";

import { motion } from "framer-motion";

localStorage.setItem("messages", JSON.stringify([]))

const Messages = () => {
  var currMessages = JSON.parse(localStorage.getItem('messages'))
  return (
    <div>
      {currMessages.map((message, index) => (
        <>
          {message["type"] === "user" ?
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
                >
                  <Typography>{message['text']}</Typography>
                </motion.div>
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
              >
                <Typography>{message['text']}</Typography>
              </motion.div>
              <br></br>
            </>
          }
        </>
        
      ))}
    </div>
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
  
  

  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <Typography variant="h3" style={{textAlign: "center", fontSize: "25px", fontWeight: "bold"}}>Mental Health Chatbot</Typography>
        
        <div style={{maxWidth: "500px", margin: "20px auto"}}>

          <div style={{height: "600px", borderRadius: "5px", border:"1px solid #ccc", padding: "10px", overflowY: "auto"}}>
              <Messages />
          </div>

          <br></br>

          <div>

            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                value={message}
                onChange={(e) => (setMessage(e.target.value))}
                placeholder="Send a message"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
          </div>

        </div>

      </div>

    </ThemeProvider>
  );
}

export default App;
