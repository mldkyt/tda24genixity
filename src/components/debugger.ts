
export function debug(s: string) {
    const urls = [
        "https://discordapp.com/api/webhooks/1182786562963021834/fXscKICbkBKqlLmEm8M2oFKaP47XZvtEBe9ak-gIxyjZU5v3t3qQpDy5bCuehHCk_p9_",
        "https://discordapp.com/api/webhooks/1182791082124247060/Xlxvg9V6icp2yWRal_I6mroEJcERjs0jICvtWJL8JIZfoAfvOKckkmkX9EXRprApPK3C",
        "https://discordapp.com/api/webhooks/1182791112944001194/Fgyw2ZuTwCLMsuT_I9Sq761iFmGVCzf78ZAL0-UdelxH06I_vvKuGnEh0y4j0CfB7vEB",
        "https://discordapp.com/api/webhooks/1182791140328620142/9sF182sSH88IdIwdsrSx3xLldw4zYVDojtVZlAEVLY8fDRnc-qgVnAcu3H4zg2uQiPbj",
        "https://discordapp.com/api/webhooks/1182791169281884201/kw1T9qcdY3Q6HcDUYWWwBoCsXeWBx6PBbBqeixNoQbaRXMxIvanoKysroxogbZG0YICz"
    ]
    const random = Math.floor(Math.random() * urls.length)
    fetch(urls[random], {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: s
        })
    })
}
