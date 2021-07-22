import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../style/infoBox.css';
function InfoBox({ title, cases, total, isActive, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${isActive && 'active'} ${isRed && 'red'}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && 'green'}`}>{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
