import { useEffect, useRef, useState } from "react";
import { geocodeByPlaceId } from "react-places-autocomplete";

import {
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Divider,
  Box,
  MenuItem,
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
import { MdGpsFixed } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import { useDispatch } from "react-redux";
// import { setSnackBar } from "../STORE/actions";
import { v4 } from "uuid";
import { locationSchema } from "../types";
import { setSnackBar } from "../STORE/actions";
import { MoonLoader } from "react-spinners";

declare const window: any;

interface schema {
  setLocation: (arg: locationSchema) => void;
  locationSet: boolean;
}
export default function CustomizedInputBase({
  locationSet,
  setLocation,
}: schema) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const autocompleteService = useRef<any>(null);
  const autocompleteOK = useRef<any>(null);

  useEffect(() => {
    if (!window.google) {
      console.error(
        "[react-places-autocomplete]: Google Maps JavaScript API library must be loaded. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library"
      );
    }

    if (!window.google.maps.places) {
      console.error(
        "[react-places-autocomplete]: Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library"
      );
    }

    autocompleteService.current =
      new window.google.maps.places.AutocompleteService();
    autocompleteOK.current = window.google.maps.places.PlacesServiceStatus.OK;
    setReady(true);
  }, []);

  // useEffect(() => {
  //   getCurrentLocation();
  //   // eslint-disable-next-line
  // },[])

  const autocompleteCallback = (predictions: any, status: any) => {
    // setLoading(false);
    if (status !== autocompleteOK.current) {
      console.error(
        "[react-places-autocomplete]: error happened when fetching data from Google Maps API.\nPlease check the docs here (https://developers.google.com/maps/documentation/javascript/places#place_details_responses)\nStatus: ",
        status
      );
      return setSuggestions([]);
    }

    setSuggestions(
      predictions.map((p: any, idx: number) => ({
        id: p.id,
        description: p.description,
        placeId: p.place_id,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting),
        matchedSubstrings: p.matched_substrings,
        terms: p.terms,
        types: p.types,
      }))
    );
  };

  const fetchPredictions = (value: any) => {
    if (value.length) {
      autocompleteService.current.getPlacePredictions(
        {
          // types: ["(regions)"],
          componentRestrictions: {
            country: "PK",
          },

          input: value,
        },
        autocompleteCallback
      );
    }
  };

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      // navigator.permissions.query({ name: "geolocation" }).then((result) => {
      // if (result.state === "granted" || result.state === "prompt") {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          const latlng = new google.maps.LatLng(latitude, longitude);

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              const address = results?.[0].formatted_address ?? '';
              setLocation({ lat: latitude, lng: longitude, address });
              setValue(address);
              dispatch(setSnackBar("Successfully taken location 🎉"));
            }
            setLoading(false);
          });
        },
        (err) => {
          setLoading(false);
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
      // }
      // else if (result.state === "denied") {
      //   dispatch(setSnackBar("Permission denied!"));
      // }
      // result.onchange = () => {
      //   console.log(result.state);
      // };
      // });
    } else {
      alert("Sorry Not available!");
    }
  };

  const handleSelect = (suggestion: any) => {
    setValue("");
    setSuggestions([]);

    setLoading(true);
    geocodeByPlaceId(suggestion.placeId)
      .then((results) => {
        const { lat, lng } = results[0]?.geometry?.location;

        setLocation({
          lat: lat(),
          lng: lng(),
          address: suggestion.description,
        });
        setValue(suggestion.description);
        setLoading(false);
        dispatch(setSnackBar("Successfully taken location 🎉"));
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const typingTimer = useRef<any>(null);
  const triggerSuggestion = (value: string) => {
    clearTimeout(typingTimer.current);
    if (value.length > 3) {
      typingTimer.current = setTimeout(() => fetchPredictions(value), 600);
    } else {
      setSuggestions([]);
    }
  };

  const onChange = (e: any) => {
    
    const value = e.target?.value ?? "";
    setValue(value);
    triggerSuggestion(value);
  };

  return (
    <Box
      position="absolute"
      top={10}
      left="calc(50% - 200px)"
      zIndex="tooltip"
      // onSubmit={onChange}
    >
      <Paper component="form" className={classes.root} onSubmit={e => e.preventDefault()}>
        {!loading && locationSet && <BsCheckAll size={25} color="blue" />}
        {loading && (
          <MoonLoader
            size={20}
            color={"var(--primaryThemeColor)"}
            loading={loading}
          />
        )}

        <InputBase
          className={classes.input}
          value={value}
          onChange={onChange}

          placeholder="Pick Up/Drop Off Location"
          // inputProps={{ "aria-label": "Search Location" }}
          disabled={!ready}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={getCurrentLocation}
        >
          <MdGpsFixed />
        </IconButton>
        <div className={classes.suggestions}>
          <>
            {suggestions.map((suggestion: any) => (
              <MenuItem key={v4()} onClick={() => handleSelect(suggestion)}>
                {suggestion.description}
              </MenuItem>
            ))}
          </>
        </div>
      </Paper>
    </Box>
  );
}

const formattedSuggestion = (structured_formatting: any) => ({
  mainText: structured_formatting.main_text,
  secondaryText: structured_formatting.secondary_text,
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    // border: "none",
    // outline: "none",
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  suggestions: {
    position: "absolute",
    left: 0,
    top: 50,
    width: "100%",
    backgroundColor: "white",
    maxHeight: 250,
    overflowY: "auto",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
