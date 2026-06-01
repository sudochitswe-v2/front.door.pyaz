/**
 * Utility function to block Developer Tools in production environments.
 * Provides protection against inspecting, viewing source, and debugging,
 * while allowing a bypass flag for development debugging.
 */
export const initializeDevToolsBlocker = (): (() => void) => {
  // Check if query flag is present to bypass blocker
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('dt') === 'true') {
    console.warn('[DevTools] Blocker bypassed via query parameter (?dt=true).');
    return () => { };
  }

  // Event handlers to keep references for cleanup
  const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const preventShortcuts = (e: KeyboardEvent) => {
    // 1. F12 (KeyCode 123)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return;
    }

    // 2. Ctrl+Shift+I / Cmd+Opt+I (KeyCode 73)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return;
    }

    // 3. Ctrl+Shift+J / Cmd+Opt+J (KeyCode 74)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return;
    }

    // 4. Ctrl+Shift+C / Cmd+Opt+C (KeyCode 67)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return;
    }

    // 5. Ctrl+U / Cmd+Opt+U (KeyCode 85) - View Source
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
      e.preventDefault();
      return;
    }
  };

  // Function to show the premium restricted page when DevTools are detected
  const showBlockPage = (): void => {
    // Inject the Google Font and the styled block overlay that matches the blue search button theme
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kyi Poh - Access Restricted</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            background-color: #111827; /* Matches bg-gray-900 from Home.tsx */
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #ffffff;
            overflow: hidden;
          }
          .card {
            background: rgba(31, 41, 55, 0.85); /* Matches bg-gray-800/80 backdrop-blur-sm */
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(75, 85, 99, 0.5); /* Matches border-gray-700/50 */
            padding: 3rem 2.5rem;
            border-radius: 20px; /* Matches rounded-xl */
            width: 90%;
            max-width: 485px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
                        inset 0 0 12px rgba(255, 255, 255, 0.05);
            animation: fadeIn 0.5s ease-out;
            position: relative;
          }
          .shield-icon {
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.4));
            animation: pulse 2.5s infinite ease-in-out;
          }
          h1 {
            font-size: 1.85rem;
            font-weight: 700;
            margin: 0 0 1rem 0;
            letter-spacing: -0.025em;
            background: linear-gradient(135deg, #60a5fa 0%, #2563eb 100%); /* Matches search button blue theme */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          p {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #9ca3af; /* Matches text-gray-400 */
            margin: 0 0 1.5rem 0;
          }
          .details {
            font-size: 0.8rem;
            color: #9ca3af;
            background: rgba(17, 24, 39, 0.6); /* Matches bg-gray-900 */
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(75, 85, 99, 0.3);
            margin-bottom: 2rem;
            text-align: left;
          }
          .details-title {
            font-weight: 600;
            color: #60a5fa; /* Matches search button accent blue */
            margin-bottom: 0.25rem;
          }
          .btn {
            background: #2563eb; /* Matches search button bg-blue-600 */
            color: white;
            border: none;
            padding: 0.875rem 2rem;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 16px; /* Matches rounded-2xl search button */
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            transition: all 0.3s ease;
            width: 100%;
          }
          .btn:hover {
            background: #3b82f6; /* Matches search button hover:bg-blue-500 */
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4), 
                        0 0 15px rgba(37, 99, 235, 0.3);
          }
          .btn:active {
            transform: translateY(1px) scale(0.97);
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.3)) drop-shadow(0 0 4px rgba(37, 99, 235, 0.4));
            }
            50% {
              transform: scale(1.03);
              filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.5)) drop-shadow(0 0 8px rgba(37, 99, 235, 0.6));
            }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <svg class="shield-icon" viewBox="0 0 24 24" width="76" height="76">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="url(#shield-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8v4" stroke="url(#shield-grad)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="16" r="1.2" fill="#60a5fa"/>
            <defs>
              <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
          <h1>Access Restricted</h1>
          <p>For security reasons, accessing developer tools on Kyi Poh is prohibited.</p>
          <div class="details">
            <div class="details-title">Security Detectors:</div>
            • Console debugging activity detected<br>
            • Inspection tools monitoring triggered
          </div>
          <button class="btn" onclick="window.location.reload()">Reload Application</button>
        </div>
      </body>
      </html>
    `;

    // Clear out standard page completely to prevent any further inspect or DOM reads
    document.open();
    document.write(htmlContent);
    document.close();
  };

  // Add event listeners
  document.addEventListener('contextmenu', preventContextMenu);
  document.addEventListener('keydown', preventShortcuts);

  // Active defense using a debugger loop
  const checkDevTools = () => {
    const startTime = performance.now();

    try {
      // Dynamic debugger call using Function constructor
      // This pauses execution when devtools is open
      (function () {
        return false;
      }
        .constructor('debugger')
        .call());
    } catch {
      // Ignore
    }

    const endTime = performance.now();

    // If the difference is > 100ms, a breakpoint/debugger halt occurred
    if (endTime - startTime > 100) {
      // DevTools detected! Remove listeners, clear interval, and show block screen
      clearInterval(intervalId);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventShortcuts);
      showBlockPage();
    }
  };

  // Set interval for periodic checking
  const intervalId = setInterval(checkDevTools, 500);

  // Return a cleanup function in case the blocker needs to be disabled
  return () => {
    document.removeEventListener('contextmenu', preventContextMenu);
    document.removeEventListener('keydown', preventShortcuts);
    clearInterval(intervalId);
  };
};
