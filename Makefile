ECMA_SOURCES := wizard.js
ECMA_SOURCES += helper.js
ECMA_SOURCES += chimaera.js
ECMA_SOURCES += base.js
ECMA_SOURCES += hole_A.js
ECMA_SOURCES += hole_B.js
ECMA_SOURCES += keys.js
ECMA_SOURCES += label_chim.js
ECMA_SOURCES += label_omk.js
ECMA_SOURCES += rib_common.js
ECMA_SOURCES += rib_A.js
ECMA_SOURCES += rib_B.js
ECMA_SOURCES += rib_C.js
ECMA_SOURCES += rib_D_Rev3.js
ECMA_SOURCES += rib_D_Rev4.js
ECMA_SOURCES += side.js
ECMA_SOURCES += wrapping.js

QCAD_BATCH := qcad -allow-multiple-instances -autostart
XSLTPROC := xsltproc

TARGETS := chimaera_S48_2.0mm.dxf		chimaera_S48_2.5mm.dxf	chimaera_S48_3.0mm.dxf
TARGETS += chimaera_S64_2.0mm.dxf		chimaera_S64_2.5mm.dxf	chimaera_S64_3.0mm.dxf
TARGETS += chimaera_S80_2.0mm.dxf		chimaera_S80_2.5mm.dxf	chimaera_S80_3.0mm.dxf
TARGETS += chimaera_S96_2.0mm.dxf		chimaera_S96_2.5mm.dxf	chimaera_S96_3.0mm.dxf
TARGETS += chimaera_S112_2.0mm.dxf	chimaera_S112_2.5mm.dxf	chimaera_S112_3.0mm.dxf
TARGETS += chimaera_S128_2.0mm.dxf	chimaera_S128_2.5mm.dxf	chimaera_S128_3.0mm.dxf
TARGETS += chimaera_S144_2.0mm.dxf	chimaera_S144_2.5mm.dxf
TARGETS += chimaera_S160_2.0mm.dxf	chimaera_S160_2.5mm.dxf

PONOKO := chimaera_S48_2.0mm.svg		chimaera_S48_2.5mm.svg	chimaera_S48_3.0mm.svg
PONOKO += chimaera_S64_2.0mm.svg		chimaera_S64_2.5mm.svg	chimaera_S64_3.0mm.svg
PONOKO += chimaera_S80_2.0mm.svg		chimaera_S80_2.5mm.svg	chimaera_S80_3.0mm.svg
PONOKO += chimaera_S96_2.0mm.svg		chimaera_S96_2.5mm.svg	chimaera_S96_3.0mm.svg
PONOKO += chimaera_S112_2.0mm.svg		chimaera_S112_2.5mm.svg	chimaera_S112_3.0mm.svg
PONOKO += chimaera_S128_2.0mm.svg		chimaera_S128_2.5mm.svg	chimaera_S128_3.0mm.svg

DWERK := chimaera_S128_2.0mm.pdf		chimaera_S144_2.0mm.pdf	chimaera_S160_2.0mm.pdf

P2_WIDTH := 384
P2_HEIGHT := 384
P3_WIDTH := 790
P3_HEIGHT := 384

TOLERANCE := 0.2 # mm

all: $(TARGETS) $(PONOKO) $(DWERK)

ponoko: $(PONOKO)

digitalwerkstatt: $(DWERK)

chimaera_S48_%.svg: ponoko.xslt chimaera_S48_%.dxf.svg
	$(XSLTPROC) --stringparam new_width $(P2_WIDTH) --stringparam new_height $(P2_HEIGHT) -o $@ $+

%.pdf:	%.dxf digitalwerkstatt.js
	$(QCAD_BATCH) $(CURDIR)/digitalwerkstatt.js $(CURDIR)/$< $(CURDIR)/$@

%.svg: ponoko.xslt %.dxf.svg
	$(XSLTPROC) --stringparam new_width $(P3_WIDTH) --stringparam new_height $(P3_HEIGHT) -o $@ $+

%.dxf.svg: %.dxf ponoko.js
	$(QCAD_BATCH) $(CURDIR)/ponoko.js $(CURDIR)/$< $(CURDIR)/$@

chimaera_S48_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 3 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S64_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 4 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S80_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 5 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S96_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 6 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S112_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 7 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S128_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 8 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S144_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 9 Mth $* Mto $(TOLERANCE) $(CURDIR)/$@

chimaera_S160_%mm.dxf: $(ECMA_SOURCES)
	$(QCAD_BATCH) $(CURDIR)/$< Rev 4 Nsu 10 Mth $* Mto $(TOLERANCE) Lle 5 $(CURDIR)/$@

clean:
	rm -f $(TARGETS) $(PONOKO) $(DWERK)
