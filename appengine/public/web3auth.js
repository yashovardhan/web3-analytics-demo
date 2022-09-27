const Web3Auth = (()=>{
    let web3AuthInstance = null;


    function getWeb3AuthInstance() {
        if (web3AuthInstance) {
            return web3AuthInstance
        }
        const web3authSdk = window.Core;
        web3AuthInstance  = new web3authSdk.Web3AuthCore({
           chainConfig: { chainNamespace: "eip155", chainId: "0x89" },
           clientId,
       });
       return web3AuthInstance;
    }

    function isConnected() {
        return !!getWeb3AuthInstance().provider;
    }

    function provider() {
        return getWeb3AuthInstance().provider;
    }

    function disconnect() {
        return getWeb3AuthInstance().logout();
    }

    async function initWeb3Auth() {       
        const web3AuthInstance = getWeb3AuthInstance();
        const adapter = new OpenloginAdapter.OpenloginAdapter({
            adapterSettings: {
            network: "testnet",
            clientId,
            uxMode: "redirect",
            loginConfig: {
                jwt: {
                name: "Custom Firebase Login",
                verifier: "web3auth-firebase-google",
                typeOfLogin: "jwt",
                clientId,
                },
            },
        },
        });
        web3AuthInstance.configureAdapter(adapter);
        console.log("initWeb3Auth",web3AuthInstance)
        await web3AuthInstance.init();
        window.web3AuthInstance = web3AuthInstance;
    }

    async function loginWithWeb3Auth() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        // rest of flow will be handled in redirect handler
        return await firebase.auth().signInWithPopup(googleProvider);
    }

    async function handleFirebaseRedirect(result) {
        if(!result.user) throw new Error("Firebase user not found");
        try {
            console.log("handleFirebaseRedirect",result)
            const idToken = await result.user.getIdToken(true)
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            console.log("Id Token", idToken);
            await _login("openlogin", "jwt", idToken);
        } catch(error) {
            console.error("Cannot get id token: ", error.message);
        }
    }

    async function _login(adapter, loginProvider, jwtToken) {
        await web3AuthInstance.connectTo(adapter, {
            loginProvider,
            extraLoginOptions: {
                id_token: jwtToken,
                domain: window.location.origin,
                verifierIdField: "sub",
            },
        });
    }

  const init = async () => {
    await initWeb3Auth();
  }
  return {
    init,
    getWeb3AuthInstance,
    isConnected,
    disconnect,
    provider,
    loginWithWeb3Auth,
    handleFirebaseRedirect,
  }
})()

window.Web3Auth = Web3Auth;
