
export function debug(s: string) {
    fetch("https://discordapp.com/api/webhooks/1182786562963021834/fXscKICbkBKqlLmEm8M2oFKaP47XZvtEBe9ak-gIxyjZU5v3t3qQpDy5bCuehHCk_p9_", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: s
        })
    })
}
