import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import userEvent from "@testing-library/user-event";
import App from "./App"

describe("Application test", () => {


    beforeEach(() => {
        render(<App />)
    })

    test("Header test", () => {
        const head = screen.getByText("Emoji Search")
        expect(head).toBeInTheDocument
    })

    test("Emoji listesi testi", () => {
        const items = screen.getAllByText("Click to copy emoji")
        expect(items.length).toEqual(20)
    })

    test("filtreleme işlemi", () => {
        const input = screen.getByRole("textbox")
        const emoji = "Grin"
        // userEvent ile yapmaya çalıştığımda inputa girdiğim değer ne olursa olsun başarıyla geçti.
        fireEvent.change(input, { target: { value: emoji } })
        expect(screen.getByText(emoji)).toBeInTheDocument()

    })

    test("kopyalama işlemi", () => {
        // emoji listesinde 0. indeksdeki elemanı alıyoruz
        const emoji = screen.getAllByText('Click to copy emoji').at(0);

        // alınan elemanın parent elementi olan divi alıyoruz
        const parentElement = emoji.parentElement

        // parent element divindeki data-clipboard-text attribute'nun içinin dolu olup olmadığını kontrol ediyoruz.
        expect(parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0)
    })


})