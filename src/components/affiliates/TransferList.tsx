import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { tabs } from "../../STORE/constants";
import formattedTitle from "../../utils/formattedTitle";

interface customListSchema {
  title: string;
  items: string[];
  showCheckBox?: boolean;
}

// const not = (a: string[], b: string[]) =>
//   a.filter((value) => b.indexOf(value) === -1);

const intersection = (a: string[], b: string[]) =>
  a.filter((value) => b.indexOf(value) !== -1);

interface schema {
  choices: string[];
  setChoices: (arg: any) => void;
}
export default function TransferList({ choices, setChoices }: schema) {
  const classes = useStyles();

  const handleToggle = (value: string) => () => {
    const currentIndex = choices.indexOf(value);
    const newChecked = [...choices];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChoices(newChecked);
  };

  const numberOfChecked = (items: string[]) =>
    intersection(choices, items).length;


  const customList = ({
    title,
    items,
    showCheckBox = true,
  }: customListSchema) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value: string) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={showCheckBox ? handleToggle(value) : undefined}
            >
              {showCheckBox && (
                <ListItemIcon>
                  <Checkbox
                    color={"primary"}
                    checked={choices.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
              )}
              <ListItemText id={labelId} primary={formattedTitle(value)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList({ title: "Choices", items: tabs })}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            disabled={true}
            aria-label="move selected right"
          >
            &gt;
          </Button>
        </Grid>
      </Grid>

      <Grid item>
        {customList({ title: "Chosen", items: choices, showCheckBox: false })}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: 200,
      height: 230,
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  })
);
