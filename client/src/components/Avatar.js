import React from 'react'
import { useAppContext } from '../context/AppContext';
import { Avatar } from '@mui/material';

const CustomAvatar = () => {

    const { user } = useAppContext()
    const { userName } = user.user
    function stringToColor(string) {
        var hash = 0;
        var i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        var color = '#';
        for (i = 0; i < 3; i += 1) {
            var value = (hash >> (i * 8)) & 0xff;
            color += "00".concat(value.toString(16)).slice(-2);
        }
        return color;
      }
      function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: "".concat(name.split(' ')[0][0]).concat(name.split(' ')[1][0]),
        };
      }
  return (
    <Avatar {...stringAvatar(userName)} />
  )
}

export default CustomAvatar