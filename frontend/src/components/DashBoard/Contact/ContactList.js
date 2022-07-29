import { Comment } from "@mui/icons-material";
import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import "../scrollbarCSS.css";

const ContactList = props => {
    console.log(props.contacts);
    const contactsArr = JSON.parse(JSON.stringify(props.contacts));
    let setMembers = props.setMembers;
    const [contacts, setContacts] = useState(contactsArr);
    const handleToggle = (value) => () => {
        setContacts((prev) => {
            let curr = [...prev];
            if(curr[value].checked === undefined){
                curr[value].checked = true;
            }else{
                curr[value].checked = !(curr[value].checked);
            }
            setMembers(curr);
            return curr; 
        });
    }
    return (
        <List sx={{ 
            width: '100%', 
            maxWidth: 360, 
            height : "60%",
            bgcolor: 'background.paper',
            overflowY:"scroll",
            // border : "1px solid gray"
            }} className="scrollElement1">
      {
      contacts.map((value,index) => {
        const labelId = `checkbox-list-label-${index + 1}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.contactId.name}(${value.contactId.email})`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    )
}
export default ContactList;