import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import EmailInput from './EmailInput';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { TextField } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EmojiPicker from "emoji-picker-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Compose({btnText}) {
  const [open, setOpen] = React.useState(false);
const [focused,setFocused]=React.useState(false)
const [files,setFiles] = React.useState([])
const [linkModal, setLinkModal] = React.useState(false);
const [linkText, setLinkText] = React.useState("");
const [linkUrl, setLinkUrl] = React.useState("");
const [emojiOpen, setEmojiOpen] = React.useState(false);
const [to, setTo] = React.useState([]);
const [cc, setCc] = React.useState([]);
const [bcc, setBcc] = React.useState([]);
const [subject, setSubject] = React.useState("");

const editorRef = React.useRef(null);
const savedEmojiRange = React.useRef(null);
const savedRange = React.useRef(null);
const fileInputRef = React.useRef(null);
//Send Email Function

const handleSend = () => {
  const email = {
    recipient: to,
    cc: cc,
    bcc: bcc,
    subject: subject,
    body: editorRef.current?.innerHTML || "",
    files: files,
  };

  console.log("EMAIL:", email);
};

// Insert Link Function
const insertLink = () => {
  if (!savedRange.current || !linkUrl) return;
  
  const range = savedRange.current;
  
  range.deleteContents();
  
  let url = linkUrl.trim();

if (!url.startsWith("http://") && !url.startsWith("https://")) {
  url = "https://" + url;
}
  const link = document.createElement("a");
  
  link.href = url;
link.textContent = linkText || url;
link.target = "_blank";
link.rel = "noopener noreferrer";
  link.addEventListener("click", (e) => {
  e.preventDefault();
  window.open(url, "_blank", "noopener,noreferrer");
});

  link.className = "text-blue-600 underline cursor-pointer";

  range.insertNode(link);

  range.setStartAfter(link);
  range.collapse(true);

  const selection = window.getSelection();

  selection.removeAllRanges();
  selection.addRange(range);

  setLinkModal(false);
  setLinkText("");
  setLinkUrl("");

  editorRef.current?.focus();
};
// Open Link Modal 
const openLinkModal = () => {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  // Make sure selection is inside our editor
  if (editorRef.current?.contains(range.commonAncestorContainer)) {
    savedRange.current = range.cloneRange();

    const selectedText = selection.toString();

    if (selectedText) {
      setLinkText(selectedText);
    }
  }

  setLinkModal(true);
};

const handleClickOpen = () => {
    setOpen(true);
  };
  //Emoji Insert Function
  const handleEmojiClick = (emojiData) => {
  if (!savedEmojiRange.current) {
    editorRef.current?.focus();

    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(editorRef.current);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    savedEmojiRange.current = range;
  }

  const range = savedEmojiRange.current;

  range.deleteContents();

  const emojiNode = document.createTextNode(emojiData.emoji);

  range.insertNode(emojiNode);

  range.setStartAfter(emojiNode);
  range.collapse(true);

  const selection = window.getSelection();

  selection.removeAllRanges();
  selection.addRange(range);

  editorRef.current?.focus();

  setEmojiOpen(false);
};
//Open Emoji Panel
const openEmojiPicker = () => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      savedEmojiRange.current = range.cloneRange();
    }
  }

  setEmojiOpen((prev) => !prev);
};


  const handleFiles = (e) => {
  const newFiles = Array.from(e.target.files);

  setFiles((prevFiles) => [
    ...prevFiles,
    ...newFiles
  ]);
};
  console.log(files);
  
  const removeFile = (indexToRemove) => {
  setFiles((prevFiles) =>
    prevFiles.filter((_, index) => index !== indexToRemove)
  );
};
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <div>
      <EditIcon/>
      <Button sx={{fontSize:14,color:'black',fontWeight:500}} onClick={handleClickOpen}>
        {btnText}
      </Button>
        </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Message
            </Typography>
            
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className='flex flex-col  h-full justify-between'>

          <div className='px-5 flex h-full flex-col gap-3'>
  <div onFocus={()=>setFocused(true)} tabIndex={0} className=''>
          {
            focused ? 
            <EmailInput
             to={to}
  setTo={setTo}
  cc={cc}
  setCc={setCc}
  bcc={bcc}
  setBcc={setBcc}
            />
             :  
                 <input placeholder='Recieptent' className='w-full h-10 text-xl border-b-2 border-gray-400 focus:outline-0' type="text" />

          }
          
                   </div>
                    <input  value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='Subject' className='w-full h-10 text-xl border-b-2 border-gray-400 focus:outline-0' type="text" />
              <div
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  className="min-h-0 flex-1 overflow-y-auto p-2 text-lg outline-none"
  data-placeholder="Compose email"
/>
          </div>
          <div className='px-5'>
            <div className='flex gap-1 flex-wrap'>
{
  files.map((file, index) => (
    <div
      key={index}
      className="flex"
    >
      <div className="flex w-fit items-center gap-2 border bg-blue-400 p-2 text-white">
        <h1>{file.name.slice(0, 20)}.....</h1>

        <div onClick={() => removeFile(index)}>
          <ClearOutlinedIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  ))
}
            </div>
           
          
<div className=' flex items-center justify-between'>
            <div className='flex items-center gap-5'>
<button onClick={handleSend} className='bg-blue-700 text-white  px-10 py-2 rounded-full cursor-pointer hover:scale-105'><strong>Send</strong></button>
          <input type="file" 
          id='file-upload'
            ref={fileInputRef}

          hidden
          multiple
          onChange={handleFiles}
          />
          <label htmlFor="file-upload">          <AttachFileOutlinedIcon  className='cursor-pointer'/>
</label>
<InsertLinkOutlinedIcon
  className="cursor-pointer"
  onClick={openLinkModal}
/>
  <div className="relative">
    <EmojiEmotionsOutlinedIcon
      className="cursor-pointer"
      onClick={openEmojiPicker}
    />

    {emojiOpen && (
      <div className="absolute bottom-10 left-0 z-50">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    )}
  </div>
              </div>
            <div>
<DeleteOutlinedIcon className='cursor-pointer bg-red-600 p-2 rounded-full text-white' sx={{fontSize:48}}/>
            </div>
          </div> 
          </div>
           
        
        </List>
        <Dialog open={linkModal} onClose={() => setLinkModal(false)}>
  <div className="flex w-96 flex-col gap-4 p-5">

    <h2 className="text-xl font-semibold">
      Insert Link
    </h2>

    <input
      value={linkText}
      onChange={(e) => setLinkText(e.target.value)}
      placeholder="Text to display"
      className="border p-2 outline-none"
    />

    <input
      value={linkUrl}
      onChange={(e) => setLinkUrl(e.target.value)}
      placeholder="URL"
      className="border p-2 outline-none"
    />

    <div className="flex justify-end gap-2">
      <button
        onClick={() => setLinkModal(false)}
        className="px-4 py-2"
      >
        Cancel
      </button>

      <button
        onClick={insertLink}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Insert
      </button>
    </div>

  </div>
</Dialog>
      </Dialog>
    </React.Fragment>
  );
}
