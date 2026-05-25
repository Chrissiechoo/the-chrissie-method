document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Navigation & Scroll Monitoring
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Mobile navigation toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      menuToggle.innerHTML = navMenu.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Scroll active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  // ==========================================
  // 2. The Director's Seat Model Toggle
  // ==========================================
  const modelCheckbox = document.getElementById('model-checkbox');
  const labelPassenger = document.getElementById('label-passenger');
  const labelDirector = document.getElementById('label-director');
  const viewPassenger = document.getElementById('view-passenger');
  const viewDirector = document.getElementById('view-director');

  if (modelCheckbox) {
    modelCheckbox.addEventListener('change', () => {
      if (modelCheckbox.checked) {
        // Director Seat
        labelPassenger.classList.remove('active');
        labelDirector.classList.add('active');
        viewPassenger.classList.remove('active');
        viewDirector.classList.add('active');
      } else {
        // Passenger Seat
        labelPassenger.classList.add('active');
        labelDirector.classList.remove('active');
        viewPassenger.classList.add('active');
        viewDirector.classList.remove('active');
      }
    });
  }


  // ==========================================
  // 3. The Activation Cycle Tabs
  // ==========================================
  const cycleBtns = document.querySelectorAll('.cycle-tab-btn');
  const cyclePanes = document.querySelectorAll('.cycle-content-pane');

  cycleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStage = btn.getAttribute('data-stage');
      
      // Toggle buttons
      cycleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle display panes
      cyclePanes.forEach(pane => {
        if (pane.getAttribute('id') === `stage-${targetStage}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });


  // ==========================================
  // 4. The Transformation Pathway Checkpoints
  // ==========================================
  const pathNodes = document.querySelectorAll('.path-node-wrapper');
  const pathwayCards = document.querySelectorAll('.pathway-detail-card');
  const pathwaySvgLine = document.querySelector('.pathway-line-active');

  // Node navigation
  pathNodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      const step = node.getAttribute('data-step');

      // Update active node styling
      pathNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Update svg line length representation
      if (pathwaySvgLine) {
        // Approximate visual dash offsets for 5 steps
        const percentage = (index / (pathNodes.length - 1)) * 1000;
        pathwaySvgLine.style.strokeDashoffset = 1000 - percentage;
      }

      // Update details card
      pathwayCards.forEach(card => {
        if (card.getAttribute('id') === `path-step-${step}`) {
          card.classList.add('active');
          // Trigger progress bars inside card
          const progressBars = card.querySelectorAll('.pathway-metric-progress');
          progressBars.forEach(bar => {
            const widthVal = bar.getAttribute('data-width');
            // Timeout to allow DOM transitions to play smoothly
            setTimeout(() => {
              bar.style.width = widthVal;
            }, 100);
          });
        } else {
          card.classList.remove('active');
        }
      });
    });
  });

  // Initialize first pathway progress bars
  const initialActiveCard = document.querySelector('.pathway-detail-card.active');
  if (initialActiveCard) {
    const progressBars = initialActiveCard.querySelectorAll('.pathway-metric-progress');
    progressBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-width');
    });
  }


  // ==========================================
  // 5. Prompt Playbook Sandbox & Slider
  // ==========================================
  const sandboxBtns = document.querySelectorAll('.sandbox-tab-btn');
  const sandboxPanes = document.querySelectorAll('.prompt-view-pane');
  const promptSlider = document.getElementById('prompt-slider');
  const promptBeforeCard = document.getElementById('compare-before');
  const promptAfterCard = document.getElementById('compare-after');
  const sliderLabel = document.getElementById('slider-percentage');

  // Tab switcher
  sandboxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPane = btn.getAttribute('data-target');

      sandboxBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sandboxPanes.forEach(pane => {
        if (pane.getAttribute('id') === `pane-${targetPane}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Interactive prompt before/after slider
  if (promptSlider) {
    promptSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      sliderLabel.textContent = `${val}%`;

      if (val <= 50) {
        promptBeforeCard.style.display = 'block';
        promptAfterCard.style.display = 'none';
        promptBeforeCard.style.opacity = '1';
      } else {
        promptBeforeCard.style.display = 'none';
        promptAfterCard.style.display = 'block';
      }
    });
  }

  // Copy Code to Clipboard functionality
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const textToCopy = document.getElementById(targetId).textContent;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = '#10b981';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });


  // ==========================================
  // 6. Interactive Scale Timeline
  // ==========================================
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      // Toggle current active state
      const wasActive = item.classList.contains('active');
      
      // Reset others
      timelineItems.forEach(i => i.classList.remove('active'));
      
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });


  // ==========================================
  // 7. Simulated AI Clone Chatbot Logic
  // ==========================================
  const botMessages = document.getElementById('chat-messages');
  const optionContainer = document.getElementById('chat-options');

  const chatFlow = {
    start: {
      bot: "Welcome! I am **AI Chrissie**, the automated reflection of Chrissie Choo's Transformation Architecture. In my core code, AI is never a pilot—it is a co-pilot, and you are the **Director**.\n\nWhat would you like to explore regarding my signature education methodology today?",
      options: [
        { text: "🌟 The Seniors AI Course Example", trigger: "seniors" },
        { text: "🏢 Corporate ROI & Premium Rates", trigger: "corporate" },
        { text: "🎓 PhD Research on Agency & Judgment", trigger: "phd" }
      ]
    },
    seniors: {
      bot: "Excellent choice. Seniors are often taught AI with tech jargon, causing them to passenger-seat: *'I can't do this.'*\n\nMy method triggers **Imagination Activation** on Day 1. Instead of telling them how ChatGPT works, I ask them to **Dream**: *'Bring a photo of someone you love. A memory that matters.'*\n\nEmotion is activated, personal stakes are high. We then explore how AI can paint the story, building **small wins** that shift their identity. They leave not tech-tired, but *unstoppable*.",
      options: [
        { text: "How do you handle ethics with them?", trigger: "seniors_ethics" },
        { text: "Back to main frameworks", trigger: "start" }
      ]
    },
    seniors_ethics: {
      bot: "Instead of a boring separate lecture, ethics is designed *directly* into the exercises. \n\nWe complete an **Ethics Checkpoint**: *'These photos you enhanced are beautiful. But they're AI-infused. When would you show this and when would you clarify it's AI? Where does responsibility sit?'*\n\nThis keeps human agency central. They leave thoughtful, wise, and in control.",
      options: [
        { text: "Explore Corporate & Premium Rates", trigger: "corporate" },
        { text: "Back to main menu", trigger: "start" }
      ]
    },
    corporate: {
      bot: "Corporates pay premium rates for **The Chrissie Method** because generic AI courses produce passive consumers who forget everything in a week. \n\nMy courses combine academic rigor (from my PhD) and the psychology of play. I design courses around **Transformation, not Information**. \n\nEmployees don't just use tools; they learn how to think, build proprietary prompts, and make ethical choices. That is high-ROI: productivity + responsibility.",
      options: [
        { text: "What is your Blue+ positioning?", trigger: "blue_moat" },
        { text: "Back to main menu", trigger: "start" }
      ]
    },
    blue_moat: {
      bot: "My **Blue+ Moat** is simple: Most AI trainers teach tools. I teach **people**.\n\n1. **Academic Credibility**: Grounded in active AI Agency research.\n2. **Experience Design**: Blending storytelling, visual structure, and joy.\n3. **Scaling Factor**: I teach Pixlr Academy trainers via my TTT framework so the core method scales without losing quality. We are scaling this across Southeast Asia!",
      options: [
        { text: "Tell me about your PhD research", trigger: "phd" },
        { text: "Back to main menu", trigger: "start" }
      ]
    },
    phd: {
      bot: "My academic dissertation focuses on **AI Agency and Human Judgment**. \n\nAs AI becomes more sophisticated, humans risk offloading their critical thinking, becoming passive passengers. \n\nMy research forms the mathematical and cognitive foundation of my teaching philosophy: how to scaffold AI education so human judgment is strengthened, not diluted. The goal is to think *better* because you have AI as a partner, not to let AI think *for* you.",
      options: [
        { text: "See how this applies to Seniors", trigger: "seniors" },
        { text: "Return to main menu", trigger: "start" }
      ]
    }
  };

  // Helper to add chat bubble
  function addBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    
    // Support simple formatting
    let formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
      
    bubble.innerHTML = formattedText;
    botMessages.appendChild(bubble);
    botMessages.scrollTop = botMessages.scrollHeight;
  }

  // Helper to render options
  function renderOptions(options) {
    optionContainer.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('bot-option-btn');
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleOptionClick(opt.text, opt.trigger));
      optionContainer.appendChild(btn);
    });
  }

  // Handle option clicks
  function handleOptionClick(text, trigger) {
    // Add user bubble
    addBubble(text, 'user');
    
    // Clear options temporarily
    optionContainer.innerHTML = '';
    
    // Add typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'bot');
    typingBubble.style.fontStyle = 'italic';
    typingBubble.textContent = "AI Chrissie is thinking...";
    botMessages.appendChild(typingBubble);
    botMessages.scrollTop = botMessages.scrollHeight;
    
    // Transition delay for organic feel
    setTimeout(() => {
      botMessages.removeChild(typingBubble);
      const nextStep = chatFlow[trigger] || chatFlow.start;
      addBubble(nextStep.bot, 'bot');
      renderOptions(nextStep.options);
    }, 900);
  }

  // Initialize simulated chatbot
  if (botMessages && optionContainer) {
    addBubble(chatFlow.start.bot, 'bot');
    renderOptions(chatFlow.start.options);
  }
});
