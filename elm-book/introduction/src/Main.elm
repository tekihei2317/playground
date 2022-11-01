module Main exposing (main)

import Html exposing (text)


main =
    -- text (sayHello "Functional Elm")
    text (bottlesOf "juice" 99)


bottlesOf : String -> Int -> String
bottlesOf contents amount =
    Debug.toString amount ++ " bottles of " ++ contents ++ " on the wall."


greeting : String
greeting =
    "Hello, Static Elm!"


sayHello : String -> String
sayHello name =
    "Hello, " ++ name ++ "."
