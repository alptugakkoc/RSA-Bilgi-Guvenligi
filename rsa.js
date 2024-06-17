function gcd(a, h) {
    while (true) {
        let temp = a % h;
        if (temp === 0)
            return h;
        a = h;
        h = temp;
    }
}

function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    if (phi === 1) return 0;

    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0) x1 += m0;

    return x1;
}

function modExp(base, exp, mod) {
    let result = BigInt(1);
    base = BigInt(base);
    exp = BigInt(exp);
    mod = BigInt(mod);

    while (exp > 0) {
        if (exp % BigInt(2) === 1) {
            result = (result * base) % mod;
        }
        exp = exp >> BigInt(1);
        base = (base * base) % mod;
    }
    return result;
}

async function main() {
    while (true) {
        let p = parseInt(prompt("p = "));
        let q = parseInt(prompt("q = "));
        let n = p * q;
        let e = parseInt(prompt("e = "));
        let phi = (p - 1) * (q - 1);

        console.log("n = " + n);
        console.log("phi = " + phi);

        // e must be co-prime to phi and smaller than phi.
        while (gcd(e, phi) !== 1) {
            e += 1;
        }

        // Private key (d stands for decrypt)
        // choosing d such that it satisfies d*e = 1 mod phi

        let start_time = performance.now();

        // Calculate d using extended Euclidean algorithm
        let d, k = 1;
        while (true) {
            if ((1 + k * phi) % e === 0) {
                d = (1 + k * phi) / e;
                break;
            }
            k++;
        }

        let end_time = performance.now();
        let total_time = end_time - start_time;

        console.log("d = " + d);
        console.log("Gizli Anahtar Oluşturma Süresi : " + total_time + " Milisaniye");

        // Şifrelenecek Mesaj
        let msg = parseInt(prompt("Şifrelenecek Mesaj = "));

        start_time = performance.now();

        // Şifreleme c = (msg ^ e) % n
        let c = modExp(msg, e, n);
        console.log("Şifrelenmiş Mesaj = " + c);

        end_time = performance.now();
        total_time = end_time - start_time;

        console.log("Şifreleme Süresi : " + total_time + " Milisaniye");

        start_time = performance.now();

        // Deşifreleme m = (c ^ d) % n
        let m = modExp(c, d, n);
        console.log("Gönderilmiş Orijinal Mesaj = " + m);

        end_time = performance.now();
        total_time = end_time - start_time;

        console.log("Deşifreleme Süresi : " + total_time + " Milisaniye");

        let cont = prompt("Devam etmek istiyor musunuz? (evet/hayır)");
        if (cont.toLowerCase() !== 'evet') {
            break;
        }
    }
}

main();