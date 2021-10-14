// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import { useCurrentPosition } from "react-use-geolocation";
import Location from "../../examples/location";

//Testing Method 1 : mocking geolocation method
// beforeAll(() => {
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

// function deferred() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => {
//     resolve = res
//     reject = rej
//   })
//   return {promise, resolve, reject}
// }

// test('displays the users current location', async () => {
//   const fakePosition = {
//     coords: {
//       latitude: 34,
//       longitude: 89,
//     },
//   }
//   const {promise, resolve} = deferred()

//   window.navigator.geolocation.getCurrentPosition.mockImplementation(
//     callback => {
//       promise.then(() => callback(fakePosition))
//     },
//   )

//   render(<Location />)
//   expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

//   await act(async () => {
//     resolve()
//     await promise
//   })

//   expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

//   expect(screen.getByText(/latitude/i)).toHaveTextContent(
//     `Latitude: ${fakePosition.coords.latitude}`,
//   )
//   expect(screen.getByText(/longitude/i)).toHaveTextContent(
//     `Longitude: ${fakePosition.coords.longitude}`,
//   )
// })

jest.mock("react-use-geolocation");

test("should display latitude and longitude", () => {
  const fakePosition = {
    coords: {
      latitude: 34,
      longitude: 46,
    },
  };

  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});

test("should display error when it fails to load location", () => {
  const errorMessage = new Error("error here");

  let setReturnValue, setError;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    const errorState = React.useState(null);
    setReturnValue = state[1];
    setError = errorState[1];
    return state[0];
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue(errorMessage);
    setError(errorMessage);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  screen.debug();
});
