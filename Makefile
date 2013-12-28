ECMA_SOURCES := wizard.js
ECMA_SOURCES += helper.js
ECMA_SOURCES += chimaera.js
ECMA_SOURCES += base.js
ECMA_SOURCES += hole_A.js
ECMA_SOURCES += hole_B.js
ECMA_SOURCES += keys.js
ECMA_SOURCES += label_chim.js
ECMA_SOURCES += label_omk.js
ECMA_SOURCES += rib_A.js
ECMA_SOURCES += rib_B.js
ECMA_SOURCES += rib_C.js
ECMA_SOURCES += rib_D_Rev3.js
ECMA_SOURCES += rib_D_Rev4.js
ECMA_SOURCES += side.js
ECMA_SOURCES += wrapping.js

QCAD_BATCH := qcad -allow-multiple-instances -autostart

TARGETS := chimaera_S96_2_5mm.dxf
TARGETS += chimaera_S96_3_0mm.dxf
TARGETS += chimaera_S144_2_5mm.dxf
TARGETS += chimaera_S160_2_5mm.dxf

all: $(TARGETS)

chimaera_S96_2_5mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $< Rev 4 Nsu 6 $(CURDIR)/$@

chimaera_S96_3_0mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $< Rev 4 Nsu 6 Mth 3.0 $(CURDIR)/$@

chimaera_S144_2_5mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $< Rev 4 Nsu 9 $(CURDIR)/$@

chimaera_S160_2_5mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $< Rev 4 Nsu 10 Lle 5 $(CURDIR)/$@

clean:
	rm -f $(TARGETS)
